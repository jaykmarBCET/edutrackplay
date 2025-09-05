import { PrismaClient } from "@/generated/prisma";
import { authCollege } from "@/services/auth"
import { NextRequest, NextResponse } from "next/server"

const prisma = new PrismaClient()

export const GET = async(req:NextRequest)=>{

    const response = await  authCollege(req);

    if(response.message){
        return NextResponse.json(response,response)
    }

    const college = response.college

    const allPaymentDue = await prisma.collegeFeePaymentByStudent.findMany({
        where:{
            collegeId:college?.id,
        },
        include:{
            student:{
                select:{
                    id:true,
                    name:true,
                    email:true,
                    address:true,
                    phone:true,
                    avatar:true
                }
            }
        }
    })

    return NextResponse.json(allPaymentDue,{status:200})
}