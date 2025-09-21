import { PrismaClient } from "@/generated/prisma";
import { generateToken } from "@/services/generateToken";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const POST = async (req: NextRequest) => {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password required" }, { status: 400 });
    }

    const parentAccount = await prisma.parent.findFirst({ where: { email } });

    if (!parentAccount) {
      return NextResponse.json({ message: "Parent not found" }, { status: 404 });
    }

    const isCorrect = await bcrypt.compare(password, parentAccount.password);
    if (!isCorrect) {
      return NextResponse.json({ message: "Password is not correct" }, { status: 400 });
    }

    const token = generateToken({ email: parentAccount.email, id: parentAccount.id });
    if (!token) {
      return NextResponse.json({ message: "Something went wrong while generating token" }, { status: 500 });
    }

    

    
    

    const res = NextResponse.json({ ...parentAccount }, { status: 200 });
    return res.cookies.set("parent",token,{
      httpOnly:true,
      sameSite:"strict",
      secure:process.env.NODE_ENV==='production'
    })

    
  } catch (error) {
    const errorInstance = error as Error;
    return NextResponse.json({ message: "Something went wrong", error: errorInstance.message }, { status: 500 });
  }
};
