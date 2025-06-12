import { Parent } from "@/models/parent.model";
import { AuthParent } from "@/services/auth";
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
    const { email, password }: { email: string; password: string } = await req.json()
    if (!email || !password) {
        return NextResponse.json({ message: "email and password required" }, { status: 400 })
    }
    const parentAccount = await Parent.findOne({ where: { email } })
    if (!parentAccount) {
        return NextResponse.json({ message: "Parent Not found" }, { status: 404 })
    }

    const isCorrect = bcrypt.compare(password, parentAccount.get().password)
    if (!isCorrect) {
        return NextResponse.json({ message: "password is not correct" }, { status: 400 })
    }

    const token = await generateToken({ email: email, id: parentAccount.get().id! })
    if (!token) return NextResponse.json({ message: "something want wrong while generating token" }, { status: 500 })
        ; (await cookies()).set("token", token, { httpOnly: true, sameSite: true, secure: true })
    const user  = parentAccount.toJSON()
    
    return NextResponse.json({...user}, { status: 200 })
}


export const PUT = async (req: NextRequest) => {
    const { email, name, address, phone }: { email: string; name: string; address: string; phone: number } = await req.json()
    const response = await AuthParent(req);
    if (response?.message) {
        return NextResponse.json(response, { status: response.message === 'not found' ? 404 : 400 })
    }
    if(!response.ok)return NextResponse.json({message:"something went wrong"},{status:500})
    const parent = response.parent

    const forUpdateParentFind = await Parent.findOne({ where: { id: parent.id, email: parent.email } })
    if(!forUpdateParentFind){
        return NextResponse.json({message:"Parent not found"}, { status:404})
    }

    forUpdateParentFind.set("email" , email)
    forUpdateParentFind.set("name",name)
    forUpdateParentFind.set("address" , address)
    forUpdateParentFind.set("phone" , phone);

    await forUpdateParentFind.save({ validate: true })

    
    return NextResponse.json({...forUpdateParentFind?.toJSON()}, { status: 200 })
}