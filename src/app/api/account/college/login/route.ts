import {  NextResponse } from "next/server";
import { College } from "@/models/college.model";
import { collegeValidate } from "@/validation/validate";
import bcrypt from "bcryptjs";
import { generateToken } from "@/services/generateToken";
import { cookies } from "next/headers";


export const POST = async(req:NextResponse)=>{
     try {
        const {email , password}:{email:string,password:string} =  await req.json()
        
        if(!email || !password){
           return NextResponse.json({message:""})
        }
        const response = collegeValidate.safeParse({email,password})
        if(response.error){
           return NextResponse.json({message:response.error.message}, {status:400})
        }
        const data = response.data;
        const college = await College.findOne({where:{email:data.email}})
        if(!college){
           return NextResponse.json({message:"college not found"}, {status:404})
        }
        const isCorrectPassword =  await bcrypt.compare(data.password, college.get().password);
        if(!isCorrectPassword){
           return NextResponse.json({message:"password incorrect"}, {status:400})
        }
        const token =  await generateToken({email:college.get().email , id:college.get().id!})
        if(!token){
           return NextResponse.json({message:"something went wrong while creating access token"}, {status:500})
        }
        
        const cookieStore =  await cookies()
        cookieStore.set({
           name:"token",
           value:token,
           httpOnly:true,
           sameSite:'strict',
           secure:true,
           maxAge:24*60*60
        })
        return NextResponse.json(college.toJSON(), {status:200})
     } catch (error) {
        const getError = error as Error
        return NextResponse.json({message:"Something went wrong",error:getError.message}, {status:500})
     }
}