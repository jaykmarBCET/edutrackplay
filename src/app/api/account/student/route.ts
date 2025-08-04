
import { authStudent } from "@/services/auth";
import { generateToken } from "@/services/generateToken";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
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
    const {
      avatar,
      coverImage,
      name,
      dob,
      password,
      address,
    }: {
      password: string;
      address: string;
      avatar: string;
      coverImage: string;
      name: string;
      dob: Date;
    } = await req.json();

    const student = await authStudent(req);
    if (student.message) {
      return NextResponse.json({ message: student.message }, { status: student.status });
    }

    const currentStudent = await prisma.student.findFirst({
      where: { id: student.student?.id, email: student.student?.email },
    });

    if (!currentStudent) {
      return NextResponse.json({ message: "Student not found" }, { status: 404 });
    }

    const hashPassword = await bcrypt.hash(password, 10);


    await prisma.student.update(
      {
        where: { id: currentStudent.id },
        data: {
          avatar: avatar,
          coverImage: coverImage,
          name: name,
          dob: dob,
          password: hashPassword,
          address: address
        }
      }
    )


    return NextResponse.json({ message: "Student updated successfully" }, { status: 200 });
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


