import { NextRequest, NextResponse } from "next/server";
import { College } from "@/models/college.model";
import { CollegeInfo } from "../../../../../types/types";
import { collegeValidate } from "@/validation/validate";
import bcrypt from "bcryptjs";
import {Op} from 'sequelize'

export const POST = async(req:NextRequest)=>{
    // create college account 
    const body:CollegeInfo = await req.json()

    const response  = collegeValidate.safeParse(body)
    if(response.error){
        return NextResponse.json({message:response.error.message as string}, {status:400})
    }
    if(!response.success){
        return NextResponse.json({message:"all field required"})
    }
    const alreadyHaveAnAccount = await  College.findOne(
        {where:{[Op.or]:[{email:response.data.email},{title:response.data.title},{phone:response.data.phone},{name:response.data.name}]}}
    )
    if(alreadyHaveAnAccount){
        return NextResponse.json({message:"already have an account"}, { status:400})
    }
    const hashPassword = await  bcrypt.hash(response.data.password,10) as string
    const newCollege = await College.create({
        name:response.data.name,
        title:response.data.title,
        phone:response.data.phone ,
        email:response.data.email,
        owner_email:response.data.owner_email,
        owner_name:response.data.owner_name,
        owner_phone:response.data.owner_phone,
        logo:response.data.logo,
        description:response.data.description,
        field:response.data.field,
        address:response.data.address,
        password:hashPassword,
    })

    if(!newCollege){
        return NextResponse.json({message:"something went wrong while creating college"},{status:500})
    }

    return NextResponse.json({ok:"college account created successfully"}, {status:200})
}

export const GET = async(req:NextResponse)=>{
    
}