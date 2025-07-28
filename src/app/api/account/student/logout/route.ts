import { authStudent } from "@/services/auth";
import { cookies } from "next/headers";
import { NextRequest,NextResponse } from "next/server";


export const GET = async(req:NextRequest)=>{
    const currentStudent = await authStudent(req);

    if(currentStudent.message){
        return NextResponse.json({message:currentStudent.message}, { status:currentStudent.status})
    }
    
    const cookiesStore = await cookies()
    cookiesStore.delete("student")
    return NextResponse.json({message:"User logout successfully"},{status:200})
}