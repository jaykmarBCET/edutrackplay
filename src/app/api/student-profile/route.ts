import { authCollege } from "@/services/auth";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export const GET = async (req: NextRequest) => {
  try {
    // ✅ Step 1: Auth check
    const response = await authCollege(req);
    if (response.message) {
      return NextResponse.json({ message: response.message }, { status: 401 });
    }

    const college = response.college;
    const studentIdParam = new URL(req.url).searchParams.get("studentId");

    // ✅ Step 2: Validate studentId
    if (!studentIdParam) {
      return NextResponse.json(
        { message: "studentId is required" },
        { status: 400 }
      );
    }

    const studentId = Number(studentIdParam);
    if (isNaN(studentId)) {
      return NextResponse.json(
        { message: "Invalid studentId" },
        { status: 400 }
      );
    }

    
    const isAllow = await prisma.studentAdmissionRequest.findFirst({
      where: { collegeId: college?.id, studentId },
    });

    if (!isAllow) {
      return NextResponse.json(
        { message: "You are not authorized to get information of this student" },
        { status: 403 }
      );
    }

    
    const studentProfile = await prisma.student.findFirst( {
      where:{id:studentId},
      select:{
        name:true,
        score:true,
        phone:true,
        email:true,
        gender:true,
        dob:true,
        address:true,
        avatar:true
      }
    });

    if (!studentProfile) {
      return NextResponse.json(
        { message: "Student not found" },
        { status: 404 }
      );
    }

    

    return NextResponse.json(studentProfile, { status: 200 });

  } catch (e) {
    const error = e as Error
    console.error("GET Student Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
