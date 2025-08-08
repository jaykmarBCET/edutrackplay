
import { PrismaClient } from "@/generated/prisma"
import { generateToken } from "@/services/generateToken"
import bcrypt from "bcryptjs"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

const prisma = new PrismaClient()



export const POST = async (req:NextRequest)=>{
     try {
        const {email ,password}:{email:string, password:string} = await req.json()
        if(!email || !password){
            return NextResponse.json({message:"all field required"}, { status:400})
        }
        const student = await prisma.student.findFirst({where:{email}})
        if(!student)return NextResponse.json({message:"student not found, please make sure email or password are correct"}, {status:404})
        
        const isCorrectPassword =  await bcrypt.compare(password ,student.password)
        if(!isCorrectPassword)return NextResponse.json({message:"password is incorrect"},{status:400})
        const token = await generateToken({email, id:student.id}) as string
        if(!token)throw new Error("token not generated yet")
        const cookiesStore =  await cookies()

        cookiesStore.set({
            name:"student",
            value:token,
            httpOnly:true,
            sameSite:'strict',
            secure:true,
            maxAge:7*24*60*60
        })
        return NextResponse.json(student, {status:200})
     } catch (error) {
        return NextResponse.json({message:"something went wrong", error}, {status:500})
     }
}