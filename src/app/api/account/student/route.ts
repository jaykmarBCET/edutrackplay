
import { authStudent } from "@/services/auth";
import { generateToken } from "@/services/generateToken";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import { uploadImage } from "@/utility/uploadCloudinary";
const prisma = new PrismaClient()

export const POST = async (req: NextRequest) => {
  try {
    const { email, password }: { email: string, password: string } = await req.json()
    if (!email || !password) {
      return NextResponse.json({ message: "all field required" }, { status: 400 })
    }
    const student = await prisma.student.findFirst({ where: { email } })
    if (!student) return NextResponse.json({ message: "student not found, please make sure email or password are correct" }, { status: 404 })

    const isCorrectPassword = await bcrypt.compare(password, student.password)
    if (!isCorrectPassword) return NextResponse.json({ message: "password is incorrect" })
    const token = await generateToken({ email, id: student.id! }) as string
    if (!token) throw new Error("token not generated yet")
    const cookiesStore = await cookies()

    cookiesStore.set({
      name: "student",
      value: token,
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
      maxAge: 7 * 24 * 60 * 60
    })
    return NextResponse.json(student, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: "something went wrong", error }, { status: 500 })
  }
}

export const PUT = async (req: NextRequest) => {
  try {
    const response = await authStudent(req);
    if(response.message){
      return NextResponse.json(response,response)
    }
    const student = response.student
   const formData =  await req.formData()
   const name = formData.get("name") as string;
   const address = formData.get("address") as string;
   const avatar = formData.get("avatar") as File;
   const coverImage = formData.get("coverImage") as File;
   const phone = formData.get("phone") as string;
   const gender = formData.get("gender") as "Male" | "Female"
   if(!name || !address  || !phone || !gender){
    return NextResponse.json({message:"all must be valid"},{status:401})
   }

   let avatarUrl = ""
   let coverImageUrl = ""
   if(avatar){
    avatarUrl =   await uploadImage(avatar)
   }
   if(coverImage){
    coverImageUrl = await uploadImage(coverImage)
   }
   if(!avatarUrl.trim()){
     avatarUrl = student?.avatar as string
   }
   if(!coverImageUrl.trim()){
    coverImageUrl = student?.coverImage as string
   }

   const updatedUser = await prisma.student.update({
    where:{
      id:student?.id
    },
    data:{
      name,
      address,
      avatar:avatarUrl,
      coverImage:coverImageUrl,
      phone,
      gender
    }
   })
   if(!updatedUser){
    return NextResponse.json({message:"Something Went Wrong while updating student data"})
   }
   return NextResponse.json({...updatedUser,password:""},{status:200})

  } catch (error) {
    return NextResponse.json({ message: "Something went wrong", error }, { status: 500 });
  }
};

export const GET = async (req: NextRequest) => {
  const currentStudent = await authStudent(req)

  if (currentStudent.message) {
    return NextResponse.json({ message: currentStudent.message }, { status: currentStudent.status })
  }

  return NextResponse.json(currentStudent.student, { status: 200 })
}


