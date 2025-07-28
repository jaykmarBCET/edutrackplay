import { authCollege } from "@/services/auth";
import { cookies } from "next/headers";
import { NextResponse,NextRequest } from "next/server";

export const GET = async(req:NextRequest)=>{

    const currentCollege =  await authCollege(req)
    if(currentCollege.message){
        return NextResponse.json({message:currentCollege.message}, {status:currentCollege.status})
    }
    const cookiesStore = await cookies()
    cookiesStore.delete("college")
    return NextResponse.json({message:"College logout successfully"},{status:200})

}