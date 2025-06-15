import { sequelize } from "@/connection/db.connection";
import { Parent } from "@/models/parent.model";
import { authParent } from "@/services/auth";
import { sendEmail } from "@/services/email";
import { generateToken } from "@/services/generateToken";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { Op } from "sequelize";

interface bodyInfo {
    name: string;
    gender: string;
    address: string;
    email: string;
    phone: number;
    age: number;
    password: string;
}

export const POST = async (req: NextRequest) => {
    const { name, address, gender, email, phone, age, password }: bodyInfo = await req.json()
    try {
        if (!name || !gender || !address || !email || !phone || !age || !password) {
            return NextResponse.json({ message: "all field required" }, { status: 400 })
        }
        const alreadyHaveAnAccount = await Parent.findOne({ where: { [Op.or]: [{ email }, { phone }] } })
        if (alreadyHaveAnAccount) {
            return NextResponse.json({ message: "already have an account" })
        }
        if (password.length < 8) {
            return NextResponse.json({ message: "password at least 8 character" }, { status: 400 })
        }
        if (String(phone).length < 10 || String(phone).length > 10) {
            return NextResponse.json({ message: "phone number must be 10 digit" })
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const otp = Math.floor(Math.random() * 999999 + 100000)
        await Parent.create({ name,gender:gender==="Female"?"Female":"Male", address, email, phone, age, password: hashPassword, otp })
        const newParent = await Parent.findOne({ where: { email, phone } })
        if (!newParent) return NextResponse.json({ message: "server issus please try again" }, { status: 500 })
        const token = await generateToken({ email: email, id: newParent.get().id! })
        await sendEmail({
            subject: "Thanks for joining", html: `
              <h3> Hello ${name}<h3>,
                 <p>Thanks for joining my organization, now you children get best educational college and coaching in India in any state</p>
                 <h2> otp verification code ${otp}</h2>

                 <p> Note: if you are not generating your account just ignore it </p>
            `, email
        })

        const cookiesStore =  await cookies()
        cookiesStore.set({
            name:"token",
            value:token,
            httpOnly:true,
            sameSite:"strict",
            maxAge:7*24*60*60,
            secure:true
        })
        return NextResponse.json({ ok: "account created successfully" }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ message: "Server issus while creating parent account", error }, { status: 500 })
    }
}

export const GET = async (req: NextRequest) => {
    try {
       const response = await authParent(req);
       if(response.message){
        return NextResponse.json({message:response.message}, {status:response.status})
       }
       const user = response.parent
        return NextResponse.json({...user}, { status: 200 })
    } catch (error) {
        const errorInstance = error as Error;
        return NextResponse.json({message:"something went wrong",error:errorInstance.message}, {status:500})
    }
}


export const PUT = async (req: NextRequest) => {
    const { email, name, address, phone }: { email: string; name: string; address: string; phone: number } = await req.json()
    const response = await authParent(req);
    if (response?.message) {
        return NextResponse.json(response, { status: response.message === 'not found' ? 404 : 400 })
    }
    if(!response.ok)return NextResponse.json({message:"something went wrong"},{status:500})
    const parent = response.parent

    const updateParent = await Parent.findOne({ where: { id: parent.id, email: parent.email } })
    if(!updateParent){
        return NextResponse.json({message:"Parent not found"}, { status:404})
    }
    await sequelize.transaction(async(t)=>{
        updateParent.set({
            email,name,phone,address
        })
        updateParent.save({transaction:t})
    })

    await updateParent.save({ validate: true })

    
    return NextResponse.json({...updateParent?.toJSON()}, { status: 200 })
}