import { PrismaClient } from "@/generated/prisma";
import { authParent } from "@/services/auth";
import { sendEmail } from "@/services/email";
import { generateToken } from "@/services/generateToken";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient()
interface bodyInfo {
  name: string;
  gender: string;
  address: string;
  email: string;
  phone: string;
  age: number;
  password: string;
}

// POST - Create new parent
export const POST = async (req: NextRequest) => {
  const { name, address, gender, email, phone, age, password }: bodyInfo = await req.json();
  
  try {
    if (!name || !gender || !address || !email || !phone || !age || !password) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }
   
    const alreadyHaveAnAccount = await prisma.parent.findFirst({
      where: {
        OR: [{ email }, { phone: phone }]
      }
    });
    

    if (alreadyHaveAnAccount) {
      return NextResponse.json({ message: "Already have an account" }, { status: 400 });
    }
    

    if (password.length < 8) {
      return NextResponse.json({ message: "Password must be at least 8 characters" }, { status: 400 });
    }
   
    if (phone.length !== 10) {
      return NextResponse.json({ message: "Phone number must be 10 digits" }, { status: 400 });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(Math.random() * 900000 + 100000);

    await prisma.parent.create({
      data: {
        name,
        gender: gender === "Female" ? "Female" : "Male",
        address,
        email,
        phone: phone,
        age,
        password: hashPassword,
        otp,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });

    const newParent = await prisma.parent.findFirst({ where: { email, phone: phone } });

    if (!newParent) {
      return NextResponse.json({ message: "Server issue, please try again" }, { status: 500 });
    }

    const token =  generateToken({ email, id: newParent.id });

    // await sendEmail({
    //   subject: "Thanks for joining",
    //   email,
    //   html: `
    //     <h3>Hello ${name}</h3>
    //     <p>Thanks for joining our platform. Your child can now explore the best educational institutes in India.</p>
    //     <h2>OTP: ${otp}</h2>
    //     <p>If you didn't sign up, you can ignore this message.</p>
    //   `
    // });

    const cookiesStore = cookies();
     (await cookiesStore).set({
      name: "parent",
      value: token,
      httpOnly: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60,
      secure: true
    });

    return NextResponse.json({ ok: "Account created successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("Prisma Error:", error);
    return NextResponse.json({
      message: "Server issues while creating parent account",
      error: error.message
    }, { status: 500 });
  }
};

// GET - Fetch logged in parent
export const GET = async (req: NextRequest) => {
  try {
    
    const response = await authParent(req);
    
    
    if (response.message) {
      return NextResponse.json({ message: response.message }, { status: response.status });
    }

    return NextResponse.json({ ...response.parent }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: "Something went wrong", error: error.message }, { status: 500 });
  }
};

// PUT - Update parent info
export const PUT = async (req: NextRequest) => {
  const { email, name, address, phone }: { email: string; name: string; address: string; phone: number } = await req.json();
  try {
    const response = await authParent(req);
    if (response?.message) {
      return NextResponse.json({ message: response.message }, { status: response.status });
    }

    const parent = await prisma.parent.findUnique({ where: { id: response?.parent?.id } });

    if (!parent) {
      return NextResponse.json({ message: "Parent not found" }, { status: 404 });
    }

    await prisma.parent.update({
      where: { id: parent.id },
      data: {
        email,
        phone: String(phone),
        name,
        address
      }
    });

    const updated = await prisma.parent.findUnique({ where: { id: parent.id } });

    return NextResponse.json({ ...updated }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: "Update failed", error: error.message }, { status: 500 });
  }
};
