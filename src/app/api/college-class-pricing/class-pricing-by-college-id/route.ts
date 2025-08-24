import { PrismaClient } from "@/generated/prisma";
import { authStudent } from "@/services/auth";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()

export const GET = async(req:NextRequest)=>{
    const response = await authStudent(req);
    if(response.message){
        return NextResponse.json(response,response)
    }
    const student = response.student;
    const collegeId = (new URL(req.url)).searchParams.get("id")
    if(!collegeId){
        return NextResponse.json({message:"CollegeId is missing"},{status:401})
    }

    const score = !student?.score?4:student.score+1;

    const collegeAndPrice = await prisma.college.findFirst({
        where:{
            id:Number(collegeId),
        },
        select:{
            id:true,
            logo:true,
            description:true,
            title:true,
            email:true,
            field:true,
            pricings:{
                where:{
                    stander:score
                },
                select:{
                    id:true,
                    duration:true,
                    stander:true,
                    price:true,
                    
                }
            }
        }
    })

    return NextResponse.json(collegeAndPrice,{status:200})
}