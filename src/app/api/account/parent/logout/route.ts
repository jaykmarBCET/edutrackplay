import { cookies } from "next/headers";
import { NextRequest,NextResponse } from "next/server";



export const GET = async(req:NextRequest)=>{
    const cookiesStore = await cookies()

    cookiesStore.delete("parent")
    return NextResponse.json({message:"Logout successfully"})
}