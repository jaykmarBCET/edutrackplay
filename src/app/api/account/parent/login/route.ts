import { Parent } from "@/models/parent.model";
import { generateToken } from "@/services/generateToken";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";



export const POST = async (req: NextRequest) => {
    try {
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
            ; (await cookies()).set("parent", token, { httpOnly: true, sameSite: true, secure: true })
        const user  = parentAccount.toJSON()
        
        return NextResponse.json({...user}, { status: 200 })
    } catch (error) {
        const errorInstance = error as Error
        return NextResponse.json({message:"something went wrong",error:errorInstance.message}, {status:500})       
    }
}