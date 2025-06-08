import { NextRequest } from "next/server";
import JWT from 'jsonwebtoken'
import { Parent } from "@/models/parent.model";

 export const AuthParent = async(req:NextRequest)=>{
    const token = req.cookies.get("token")?.value || req.headers.get("authorization")
    if(!token){
        return {message:"Unauthorized parent"}
    }
    const decode = await JWT.verify(token , process.env.JWT_SECURE_KEY!)
    if(!decode) return {message:"expire token please login first"}
    const parent = await Parent.findOne({where:{email: decode.email , id:decode.id}})
    if(!parent){
        return {message:"not found"}
    }

    req.user = parent;
    return {ok:"ok"}
}