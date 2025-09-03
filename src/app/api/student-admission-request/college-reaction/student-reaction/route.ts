import { PrismaClient } from "@/generated/prisma";
import { authStudent } from "@/services/auth";
import { NextRequest, NextResponse } from "next/server";


const prisma = new PrismaClient()
export const GET = async (req: NextRequest) => {
    try {
        const response = await authStudent(req);
        if (response.message) {
            return NextResponse.json(response, { status: response.status })
        }

        const student = response.student

        const allPayment = await prisma.collegeFeePaymentByStudent.findMany({
            where: {
                studentId: student?.id
            },
            include:{
                class:{
                    select:{
                        field:true,
                        stander:true,

                    },
                    
                }
            }
        })

        return NextResponse.json(allPayment, { status: 200 })
    } catch (e) {
        const error = e as Error
        return NextResponse.json({ error, message: "Server issus" + error.message }, { status: 500 })
    }
}

// pay all due by student

export const POST = async(req:NextRequest)=>{
    const response = await authStudent(req);
    if(response.message){
        return NextResponse.json(response,{status:response.status})
    }
    
    return NextResponse.json({message:"Success"},{status:200})
}