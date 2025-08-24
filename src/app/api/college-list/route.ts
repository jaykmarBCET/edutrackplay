import { PrismaClient } from "@/generated/prisma";
import { authStudent } from "@/services/auth";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()

export const GET = async (req: NextRequest) => {
  const response = await authStudent(req);

  if (response.message) {
    return NextResponse.json(response, { status: 401 })
  }

  const student = response.student;
  

  const score = !student?.score?4:student.score+1;

  const collegeList = await prisma.college.findMany({
    where: {
      pricings: {
        some: {                 
          stander:score
        }
      },
      
    },
    select:{
        id:true,
        logo:true,
        title:true,
        description:true,
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
                collegeId:true,
                price:true
            }
        }
    }
  });

  return NextResponse.json({ colleges: collegeList }, { status: 200 })
}
