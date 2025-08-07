import {  NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { generateToken } from "@/services/generateToken";
import { cookies } from "next/headers";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient()



export const POST = async(req:NextResponse)=>{
     try {
        const {email , password}:{email:string,password:string} =  await req.json()
        console.log(email,password)
        if(!email || !password){
           return NextResponse.json({message:""},{status:401})
        }
        
        const data = {email,password}
        const college = await prisma.college.findFirst({where:{email:data.email}})
        if(!college){
           return NextResponse.json({message:"college not found"}, {status:404})
        }
        const isCorrectPassword =  await bcrypt.compare(data.password, college.password);
        if(!isCorrectPassword){
           return NextResponse.json({message:"password incorrect"}, {status:400})
        }
        const token =   generateToken({email:college.email , id:college.id!})
        if(!token){
           return NextResponse.json({message:"something went wrong while creating access token"}, {status:500})
        }
        
        const cookieStore =  await cookies()
        cookieStore.set({
           name:"college",
           value:token,
           httpOnly:true,
           sameSite:'strict',
           secure:true,
           maxAge:24*60*60
        })
        return NextResponse.json(college, {status:200})
     } catch (error) {
        const getError = error as Error
        return NextResponse.json({message:"Something went wrong",error:getError.message}, {status:500})
     }
}