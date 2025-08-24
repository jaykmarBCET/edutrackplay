import { PrismaClient } from "@/generated/prisma";
import { authCollege } from "@/services/auth"

import { NextRequest, NextResponse } from "next/server"

const prisma = new PrismaClient()

export const POST = async (req: NextRequest) => {
    const response = await authCollege(req);
    
    if (response.message) {
        return NextResponse.json({ message: response.message }, { status: response.status })
    }

    const { price, stander, duration }: { price: number, stander: number, duration: number } = await req.json()
    if (!price || !stander || !duration) {
        return NextResponse.json({ message: "All field  required" })
    }
    if (stander <= 3 || stander > 12) {
        return NextResponse.json({ message: "stander must be lie between 4 and 12" }, { status: 401 })
    }
    if (duration <= 0 || duration > 52) {
        return NextResponse.json({ message: "Course duration must be lie between one week and 52 week last" }, { status: 401 })
    }
    if (price <= 0) {
        return NextResponse.json({ message: 'Price must be positive value' }, { status: 401 })
    }


    const college = response.college;
    const alreadyHave = await prisma.collegeClassPricing.findFirst({
        where: {
            stander,
            collegeId: college?.id,
        }
    })
    if (alreadyHave) {
        return NextResponse.json({ message: "All ready created this class" }, { status: 401 })
    }

    const newClass = await prisma.collegeClassPricing.create({
        data: {
            collegeId: Number(college?.id),
            price,
            duration,
            stander,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    })

    if (!newClass) {
        return NextResponse.json({ message: "Something went wrong while creating newClass please try again" }, { status: 500 })
    }

    return NextResponse.json(newClass, { status: 200 })
}

export const GET = async (req: NextRequest) => {
    const response = await authCollege(req);

    if (response.message) {
        return NextResponse.json(response, { status: response.status })
    }

    const college = response.college;

    const allClassPricing = await prisma.collegeClassPricing.findMany({
        where: { collegeId: college?.id },
        orderBy: [{ updatedAt: "desc" }, { createdAt: "desc" }, { stander: "desc" }]
    })

    if (!allClassPricing) {
        return NextResponse.json({ message: "No Have any created class yet " }, { status: 200 })
    }

    return NextResponse.json(allClassPricing, { status: 200 })
}

export const PUT = async (req: NextRequest) => {
    const response = await authCollege(req);

    if (response.message) {
        return NextResponse.json(response, { status: response.status })
    }
    const { classId, duration, price, stander }: { classId: number, duration: number, price: number, stander: number } = await req.json()
    const college = response.college

    if (!classId) return NextResponse.json({ message: "class Id is required" }, { status: 401 })
    if (!price || !stander || !duration) {
        return NextResponse.json({ message: "All field  required" })
    }
    if (stander <= 3 || stander > 12) {
        return NextResponse.json({ message: "stander must be lie between 4 and 12" }, { status: 401 })
    }
    if (duration <= 0 || duration > 52) {
        return NextResponse.json({ message: "Course duration must be lie between one week and 52 week last" }, { status: 401 })
    }
    if (price <= 0) {
        return NextResponse.json({ message: 'Price must be positive value' }, { status: 401 })
    }

    const updatedClass = await prisma.collegeClassPricing.update({
        where: {
            collegeId: Number(college?.id),
            id: classId
        },
        data: {
            duration,
            price,
            stander,
            updatedAt: new Date()
        },
    })

    if (!updatedClass) {
        return NextResponse.json({ message: "Course duration must be lie between one week and 52 week last" }, { status: 401 })
    }

    return NextResponse.json(updatedClass, { status: 200 })

}

export const DELETE = async (req: NextRequest) => {
    const response = await authCollege(req);

    if (response.message) {
        return NextResponse.json(response, { status: response.status })
    }
    const completeUrl = new URL(req.url)
    

    const classId  = completeUrl.searchParams.get("classPriceId") as number | null
    if (!classId) {
        return NextResponse.json({ message: "Class Id is required" }, { status: 401 })
    }
    const college = response.college
    const akw = await prisma.$transaction([
        
        prisma.collegeClassPricing.delete({
            where: {
                id: classId,
                collegeId: college?.id
            }
        })
    ])
    if(akw.length<0){
        return NextResponse.json({message:"Something went wrong while deleting class"},{status:500})
    }    

    return NextResponse.json({message:"Class Deleted successfully"},{status:200})
}