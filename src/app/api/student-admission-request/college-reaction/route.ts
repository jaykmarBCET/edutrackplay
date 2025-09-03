import { authCollege } from "@/services/auth";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";


const prisma = new PrismaClient()
export const GET = async (req: NextRequest) => {
    const response = await authCollege(req);

    if (response.message) {
        return NextResponse.json(response, { status: 401 })
    }
    const searchParams = (new URL(req.url)).searchParams
    if(searchParams.get("requestId")){
        const requestId = Number(searchParams.get("requestId"))

        const studentAdmissionRequest = await prisma.studentAdmissionRequest.findFirstOrThrow({
            where:{
                id:requestId,
            },
            include:{
                student:{
                    
                    select:{
                        name:true,
                        email:true,
                        score:true,
                        address:true
                    }
                }
            }
        })

        return NextResponse.json(studentAdmissionRequest)
    }
    const college = response.college

    const allRequest =  await prisma.studentAdmissionRequest.findMany({
        where: {
            collegeId: college?.id,
            isAccept:false
        }
    })
    return NextResponse.json(allRequest, { status: 200 })
}

export const POST = async (req: NextRequest) => {
    try {
        const response = await authCollege(req)
        if (response.message) {
            return NextResponse.json(response, { status: 401 })
        }

        const college = response.college;
        
        const { requestId,  isAccept, reason}: { requestId: number; isAccept: boolean; reason: string; } = await req.json()
        const request = await prisma.studentAdmissionRequest.findFirst({where:{id:requestId}})
        const student = await prisma.student.findFirst({
            where:{
                id:request?.studentId
            }
        })

        const alreadyHave = await prisma.collegeFeePaymentByStudent.findFirst({
            where:{
                studentId:student?.id,
                collegeId:college?.id
            }
        })

        if(alreadyHave){
            return NextResponse.json({message:"Already have"},{status:400})
        }

        if(!request){
            return NextResponse.json({message:"Request not found"})
        }

        if (!isAccept) {
            if (!reason) {
                return NextResponse.json({ message: "Please give reason" }, { status: 401 })
            }

            await prisma.studentAdmissionRequest.update({
                where: {
                    studentId:request.studentId,
                    id: requestId,
                    collegeId: college?.id
                },
                data: {
                    reason: reason
                }
            })

            return NextResponse.json({ message: "Request unaccepted successfully" }, { status: 200 })
        }


        // In here we accepted student request and also make relation college and student or also created class
        await prisma.$transaction(async (tx) => {
            const request = await tx.studentAdmissionRequest.findFirst({ where: { id: requestId } });
            if (!request) throw new Error("Request not found");

            const createClass = await tx.class.create({
                data: {
                    name:student?.name as string,
                    stander: request.stander,
                    field: request?.field,
                    studentId:request.studentId,
                    collegeId: college?.id,
                    session:new Date(),
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                select: { id: true, stander: true }
            });

            await tx.collegeStudent.create({
                data: {
                    collegeId: Number(college?.id),
                    studentId:request.studentId,
                    classId: createClass.id,
                    rollNumber: parseInt(`${college?.id}0000${request.studentId}`),
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            });

            await tx.studentAdmissionRequest.update({
                where: { id: requestId },
                data: { reason, isAccept: true },
            });
            const classPrice = await tx.collegeClassPricing.findFirst({
                where: {
                    collegeId: college?.id,
                    stander: Number(createClass.stander)
                }
            })
            if (!classPrice) {
                return NextResponse.json({ message: "Mission class pricing" }, { status: 500 })
            }
            // make payment
            await tx.collegeFeePaymentByStudent.create({
                data: {
                    transactionId: "",
                    studentId: student?.id as number,
                    collegeId: Number(college?.id),
                    classId: createClass.id,
                    price: classPrice.price,
                    collegeClassPricingId: classPrice.id,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    expireDuration: -1,
                    status: "Pending"
                }
            })
        });

        return NextResponse.json({ message: "Request accepted successfully" }, { status: 200 })
    } catch (e) {
        const error = e as Error
        console.log(error)
        return NextResponse.json({ error: error, message: "Server issus" + error.message }, { status: 500 })
    }
}
