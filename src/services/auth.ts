import { NextRequest } from "next/server";
import JWT from 'jsonwebtoken'
import { Parent } from "@/models/parent.model";
import { Student } from "@/models/student.model";
import { AuthParentInfo } from "../../types/types";
import { College } from "@/models/college.model";

 export const authParent = async(req:NextRequest)=>{
    const token = req.cookies.get("token")?.value || req.headers.get("authorization")
    if(!token){
        return {message:"Unauthorized parent", status:400}
    }
    const decode = await JWT.verify(token , process.env.JWT_SECURE_KEY!) as AuthParentInfo
    if(!decode) return {message:"expire token please login first", status:400}
    const parent = await Parent.findOne({where:{email: decode.email , id:decode.id}})
    if(!parent){
        return {message:"not found", status:404}
    }

     
    return {ok:"ok", parent:parent.toJSON() , status:200}
}

export const authStudent = async(req:NextRequest)=>{
    const token = req.cookies.get("token")?.value  || req.headers.get("authorization") as string
    if(!token)return {message:"Un authorization request", status:400}
     
    const decode = JWT.verify(token , process.env.JWT_SECRET_KEY!) as AuthParentInfo;
    if(!decode)return {message:"expire token", status:400}
    const getUser = await Student.findOne({where:{id:decode.id , email:decode.email}})
    if(!getUser)return {message:"Student not found", status:404}
    return {ok:"ok" , student:getUser.toJSON()}

}


export const authCollege = async(req:NextRequest)=>{
    const token = req.cookies.get("token")?.value || req.headers.get("authorization")

    if(!token){
        return {message:"Unauthorized request",status:400}
    }
    const decode =  JWT.verify(token , process.env.JWT_SECURE_KEY!) as AuthParentInfo
    if(!decode){
        return {message:"token expired , please login first", status:400}
    }

    const college = await College.findOne({where:{id:decode.id, email:decode.email}})
    if(!college){
        return {message:"college not found", status:400}
    }

    return {ok:"ok", college}
}