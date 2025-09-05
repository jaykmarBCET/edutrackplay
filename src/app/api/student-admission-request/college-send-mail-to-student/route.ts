import { authCollege } from "@/services/auth"
import { sendEmail } from "@/services/email";
import { NextRequest, NextResponse } from "next/server"


export const POST = async(req:NextRequest)=>{
    // send mail to student for request to pay payment due of class fee
    const response = await authCollege(req);

    if(response.message){
        return NextResponse.json(response,response)
    }

    const college = response.college;
    const studentId = (new URL(req.url)).searchParams.get("studentId")
    if(!studentId){
        return NextResponse.json({message:"Student id required"},{status:400})
    }

    return "jfhfnb"
}