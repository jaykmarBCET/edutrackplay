import { NextRequest, NextResponse } from "next/server";
import { College } from "@/models/college.model";
import { CollegeInfo } from "../../../../../types/types";
import {z} from 'zod/v4'
export const POST = async(req:NextRequest)=>{
    // create college account 
    const {name ,title, email,phone, description,logo,owner_phone, owner_email,owner_name,field,password}:CollegeInfo = await req.json()

    const collegeObject = z.object({
        name:
    })

}