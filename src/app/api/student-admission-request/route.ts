import { authStudent } from "@/services/auth";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient()
export const POST = async (req: NextRequest) => {
    try {
        const response = await authStudent(req);
    
        if (response.message) {
            return NextResponse.json(response, { status: response.status })
        }
        const { field, title, stander, description, collegeId }: { field: string, stander: number, description: string, title: string, collegeId: number } = await req.json()
        const student = response.student
       
    
    
        if (!field || !title || !stander || !description || !collegeId) {
            return NextResponse.json({ message: "all field required" }, { status: 401 })
        }
        if (stander <= 3 || stander > 12) {
            return NextResponse.json({ message: "Please select valid stander ( 4 <= stander <= 12)" })
        }
        const alreadyHaveARequest = await prisma.studentAdmissionRequest.findFirst({
            where: {
                collegeId: collegeId,
                studentId: student?.id,
                stander: stander.toString()
            }
        })
        
    
        if (alreadyHaveARequest) {
            return NextResponse.json({ message: "Already have a request, please wait for response" }, { status: 401 })
        }
    
        
        const newRequest = await prisma.studentAdmissionRequest.create({
            data: {
                description,
                title,
                stander: stander.toString(),
                reason: "Empty",
                collegeId: collegeId,
                field: field,
                coachingId: null,
                studentId: Number(student?.id),
                createdAt: new Date(),
                updatedAt: new Date()
            }
        })
        if (!newRequest) {
            return NextResponse.json({ message: "Something went wrong while making request, please try again" }, { status: 500 })
        }
    
        return NextResponse.json(newRequest, { status: 200 })
    } catch (e) {
        const error = e as Error;
        return NextResponse.json({message:"Server error", error},{status:500})
    }
}

export const GET = async (req: NextRequest) => {

    const response = await authStudent(req);

    if (response.message) {
        return NextResponse.json(response, { status: response.status })
    }

    const allRequest = await prisma.studentAdmissionRequest.findMany({
        where: {
            studentId: response.student?.id
        },
        orderBy: [{ updatedAt: "desc", createdAt: "desc" }]
    })

    return NextResponse.json(allRequest, { status: 200 })
}

export const PUT = async (req: NextRequest) => {
    const response = await authStudent(req);

    if (response.message) {
        return NextResponse.json(response, { status: response.status })
    }

    const student = response.student;
    const { requestId, stander, title, field, description } = await req.json()


    if (!stander || !title || !field || !description || !requestId) {
        return NextResponse.json({ message: "All field required" })
    }

    if (stander <= 3 && stander > 12) {
        return NextResponse.json({ message: "Please Enter valid stander ( 4 <= stander <= 12)" }, { status: 401 })
    }

    const isValidToUpdate = await prisma.studentAdmissionRequest.findFirst({
        where: {
            id: requestId,
            studentId: student?.id
        }
    })

    if (!(Number(isValidToUpdate?.updatedAt.getTime()) <= (Date.now() - 3 * 60 * 60 * 1000))) {
        return NextResponse.json({ message: "You can't update because already expired" }, { status: 401 })
    }

    await prisma.$transaction([

        prisma.studentAdmissionRequest.update({
            where: {
                studentId: student?.id,
                id: requestId
            },
            data: {
                title,
                description,
                stander,
                field,
            }
        })
    ])

    const updatedRequest = await prisma.studentAdmissionRequest.findFirst({
        where:{
            id:requestId,
            studentId:student?.id
        }
    })

    return NextResponse.json(updatedRequest,{status:200})
}


export const DELETE = async(req:NextRequest)=>{
    const response =  await authStudent(req);
    if(response.message){
        return NextResponse.json(response,{status:401})
    }

    const {requestId}:{requestId:number} = await req.json()
    if(!requestId){
        return NextResponse.json(response,{status:response.status})
    }
    const student = response.student

    const isHave = await prisma.studentAdmissionRequest.findFirst({
        where:{
            id:requestId,
            studentId:student?.id
        }
    })

    if(!isHave){
        return NextResponse.json({message:"Not found"},{status:404})
    }

    await prisma.$transaction([
        prisma.studentAdmissionRequest.delete({
            where:{
                id:requestId,
                studentId:student?.id
            }
        })
    ])
    const isDeleted = await prisma.studentAdmissionRequest.findFirst({
        where:{
            id:requestId,
            studentId:student?.id
        }
    })

    if(!isDeleted){
        return NextResponse.json({message:"Something went wrong while deleting request, please try again"},{status:500})
    }

    return NextResponse.json(isDeleted,{status:200})
}
