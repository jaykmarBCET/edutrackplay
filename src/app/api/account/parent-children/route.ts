import { Parent } from "@/models/parent.model";
import { Student } from "@/models/student.model";
import { AuthParent } from "@/services/auth";
import { sendEmail } from "@/services/email";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

interface bodyInfo {
    name: string;
    email: string;
    password: string;
    dob: Date;
    address: string;
    avatar: string
}
export const POST = async (req: NextRequest) => {
    try {
        const response = await AuthParent(req);
        if (response.message) {
            return NextResponse.json({ message: response.message }, { status: 400 })
        }
        if (!response.ok) {
            throw new Error("something went wrong")
        }
        const parent = await Parent.findOne({ where: { id: response.parent.id, email: response.parent.email } })
        if (!parent) return NextResponse.json({ message: "Parent not found" }, { status: 404 })
        const { name, email, password, dob, address, avatar }: bodyInfo = await req.json()
        if (!name || !email || !password || !dob || !address || !avatar) {
            return NextResponse.json({ message: "all field required" }, { status: 400 })
        }

        const alreadyHave = await Student.findOne({ where: { email: email } })
        if (!alreadyHave) return NextResponse.json({ message: "Already have account" }, { status: 400 })
        const hashPassword = await bcrypt.hash(password, 10)
        const newStudent = await Student.create({ name, email, dob, address, avatar, password: hashPassword, parentId: response.parent.id })

        if (!newStudent) {
            throw new Error("server error while creating student")
        }
        const html = `
  <h2>Welcome, ${name}!</h2>
  <p><strong>Email:</strong> ${email}</p>
  <p><strong>Temporary Password:</strong> ${password}</p>
  <p style="color: red;">⚠️ Please change your password immediately after logging in to ensure your account is secure.</p>
  <p>If you didn’t request this account, you can ignore this message.</p>
`;
        await sendEmail({ subject: "Your Student Account Has Been Created", html, email });

        const allStudent = await Student.findAll({ where: { parentId: response.parent.id } })
        if (!allStudent) {
            throw new Error("something went wrong while fetching student")
        }
        return NextResponse.json(allStudent.toString(), { status: 200 })
    } catch (error: unknown) {
        return NextResponse.json({ message: "something went wrong", error }, { status: 500 })
    }
}

export const GET = async (req: NextRequest) => {
    try {
        const response = await AuthParent(req);
        if(response.message){
            return NextResponse.json({message:response.message}, {status:400})
        }
        const getAllStudent =  await Student.findAll({where:{parentId:response.parent?.id}})
        if(!getAllStudent){
            return NextResponse.json({message:"Student Empty"}, {status:400})
        }

        return NextResponse.json(getAllStudent.toString(), {status:200})

    } catch (error: unknown) {
        return NextResponse.json({ message: "something went wrong", error }, { status: 500 })
    }
}

export const PUT = async (req:NextRequest)=>{
    try {
        const response = await AuthParent(req);
        
    } catch (error) {
        
    }
}