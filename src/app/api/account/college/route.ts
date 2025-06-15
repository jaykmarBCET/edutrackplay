import { NextRequest, NextResponse } from "next/server";
import { College } from "@/models/college.model";
import { CollegeInfo } from "../../../../../types/types";
import { collegeValidate } from "@/validation/validate";
import bcrypt from "bcryptjs";
import {Op} from 'sequelize'
import { authCollege } from "@/services/auth";


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

export const GET = async(req:NextRequest)=>{
     try {
        const response = await authCollege(req)
        if(response?.message){
           return NextResponse.json({message:response.message},{ status:response.status})
        }
        return NextResponse.json(response.college, { status:response.status})
     } catch (error) {
        const serverError = error as Error;
        return NextResponse.json({message:"something went wrong",error:serverError.message},{status:500})
     }
}


export const PUT = async(req:NextRequest)=>{
     try {
        const response = await authCollege(req)
        if(response?.message){
           return NextResponse.json({message:response.message},{ status:response.status})
        }
         const college = await College.findOne({where:{email:response.college?.get().email, id:response.college?.get().id}})
         if(!college){
            return NextResponse.json({message:"college not found"}, {status:404})
         }
         const {logo,title,name,address,field,password,description,images,phone,website,owner_email,owner_name,owner_phone} = await req.json() as CollegeInfo
        college.set({
            logo: logo.trim()!==''?logo:college.get().logo,
            title: title.trim()!==""?title:college.get().title,
            name:name.trim()!==""?name:college.get().name,
            address:address.trim()!==""?address:college.get().address,
            field:field.trim()!==""?field:college.get().field,
            password:password.trim()!==""?await bcrypt.hash(password,10):college.get().password,
            description:description?.trim()!==""?description:college.get().description,
            images:images!.length>0?[...college.get().images!, ...images!]:[...college.get().images!],
            phone:phone,
            website:website?.trim()!==""?website:college.get().website,
            owner_email:owner_email.trim()!==""?owner_email:college.get().owner_email,
            owner_phone:owner_phone?owner_phone:college.get().owner_phone,
            owner_name:owner_name.trim()!==""?owner_name:college.get().owner_name,
        })

        await college.save({validate:false}) 

        return NextResponse.json(college,{status:200})
     } catch (error) {
        const serverError = error as Error;
        return NextResponse.json({message:"something went wrong",error:serverError.message},{status:500})
     }
}
