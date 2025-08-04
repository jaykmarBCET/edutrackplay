import { PrismaClient } from "@/generated/prisma";
import { authParent } from "@/services/auth";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { uploadImage } from "@/utility/uploadCloudinary";

const prisma = new PrismaClient();

export const POST = async (req: NextRequest) => {
  try {
    const response = await authParent(req);
    if (response.status > 300) {
      return NextResponse.json({ message: response.message }, { status: 401 });
    }

    const formData = await req.formData();
    

    const file = formData.get("avatar") as File;
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const address = formData.get("address") as string;
    const dob = formData.get("dob") as string;
    const gender = formData.get("gender") as string
    const phone = formData.get("phone") as string
 

    if (!file || !name || !email || !password || !address || !dob || !gender || !phone) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }
    const already = await prisma.student.findFirst({where:{email}})
    if(already){
      return NextResponse.json({message:"Make sure each student have unique email id"},{status:400})
    }
    const avatarUrl = await uploadImage(file);
    const hashPassword = await bcrypt.hash(password, 10);
    const newStudent = await prisma.student.create({
      data: {
        name,
        email,
        password: hashPassword,
        address,
        dob: new Date(dob),
        avatar: avatarUrl,
        createdAt:new Date(),
        gender:gender,
        updatedAt:new Date(),
        phone:phone,
        parentId: response.parent?.id,
      },
    });

    return NextResponse.json({ message: "Student Created", student: newStudent }, { status: 201 });

  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json({ message: "Something went wrong", error }, { status: 500 });
  }
};


export const GET = async (req: NextRequest) => {
    try {
        const response = await authParent(req);
        if(response.message){
            return NextResponse.json({message:response.message}, {status:400})
        }
        const getAllStudent =  await prisma.student.findMany({where:{parentId:response.parent?.id}})
        if(!getAllStudent){
            return NextResponse.json({message:"Student Empty"}, {status:400})
        }

        return NextResponse.json(getAllStudent, {status:200})

    } catch (error: unknown) {
        return NextResponse.json({ message: "something went wrong", error }, { status: 500 })
    }
}
