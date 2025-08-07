import { NextRequest } from "next/server";
import JWT from 'jsonwebtoken';
import { AuthParentInfo } from "../../types/types";

import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient()
 export const authParent = async(req:NextRequest)=>{
    const token = req.cookies.get("parent")?.value || req.headers.get("authorization")
    
   try {
     if(!token){
         return {message:"Unauthorized parent", status:400}
     }
     
     const decode =  JWT.verify(token , process.env.SECRET_KEY!) as AuthParentInfo
     
     if(!decode) return {message:"expire token please login first", status:400}
     
     const parent = await prisma.parent.findFirst({where:{email: decode.email , id:decode.id}})
     
     if(!parent){
         return {message:"not found", status:404}
     }
 
      
     return {ok:"ok", parent:parent , status:200}
   } catch (e) {

    const error = e as Error
    return {message:error?.message as string}
   }
}

export const authStudent = async(req:NextRequest)=>{
    const token = req.cookies.get("student")?.value  || req.headers.get("authorization") as string
    if(!token)return {message:"Un authorization request", status:400}
     
    const decode = JWT.verify(token , process.env.SECRET_KEY!) as AuthParentInfo;
    if(!decode)return {message:"expire token", status:400}
    const getUser = await prisma.student.findFirst({where:{id:decode.id , email:decode.email}})
    if(!getUser)return {message:"Student not found", status:404}
    return {ok:"ok" , student:getUser}

}


export const authCollege = async(req:NextRequest)=>{
    const token = req.cookies.get("college")?.value || req.headers.get("authorization")
    
    
    if(!token){
        return {message:"Unauthorized request",status:400}
    }
    const decode =  JWT.verify(token , process.env.SECRET_KEY!) as AuthParentInfo
    if(!decode){
        return {message:"token expired , please login first", status:400}
    }
    
    const college = await prisma.college.findFirst({where:{id:decode.id, email:decode.email}})
    
    if(!college){
        return {message:"college not found", status:400}
    }

    return {ok:"ok", college}
}