import { PrismaClient } from "@/generated/prisma";
import { authStudent } from "@/services/auth";
import { verifySignature } from "@/services/verifySignatre";
import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
    key_id:process.env.RAZORPAY_API_KEY!,
    key_secret:process.env.RAZORPAY_SECRET_KEY_ID!
})


const prisma = new PrismaClient()
export const GET = async (req: NextRequest) => {
    try {
        const response = await authStudent(req);
        if (response.message) {
            return NextResponse.json(response, { status: response.status })
        }

        const student = response.student

        const allPayment = await prisma.collegeFeePaymentByStudent.findMany({
            where: {
                studentId: student?.id
            },
            include:{
                class:{
                    select:{
                        field:true,
                        stander:true,
                        id:true


                    },
                    
                },
                college:{
                    select:{
                        name:true,
                        title:true,
                        address:true,
                        logo:true,
                    }
                }
            }
        })

        return NextResponse.json(allPayment, { status: 200 })
    } catch (e) {
        const error = e as Error
        return NextResponse.json({ error, message: "Server issus" + error.message }, { status: 500 })
    }
}

// pay all due by student
export const POST = async (req: NextRequest) => {
  try {
    const response = await authStudent(req);
    if (response.message) {
      return NextResponse.json(response, { status: response.status });
    }
    const {classPricingId} = await req.json()
    const student = response.student
    if(!classPricingId){
        return NextResponse.json({message:"Class Pricing id required"},{status:400})
    }

    if (!razorpay) {
      return NextResponse.json(
        { message: "Razorpay client not initialized" },
        { status: 500 }
      );
    }

    const classPricingData = await prisma.collegeFeePaymentByStudent.findFirst({
        where:{
            studentId:student?.id,
            id:classPricingId
        }
    })
    const order = await razorpay.orders.create({
      amount: Number(classPricingData?.price) * 100, // must match frontend
      currency: "INR",
      receipt: `receipt_${Date.now()}`, // better unique receipt
    });


    return NextResponse.json(
      { orderId: order.id, amount: order.amount },
      { status: 200 }
    );
  } catch (error:any) {
    console.error("❌ Razorpay Order Error:", error);
    return NextResponse.json(
      { message: error.message ?? "Internal Server Error" },
      { status: 500 }
    );
  }
};

interface PaymentVerifyBody{
    razorpayOrderId:string
    razorpayPaymentId:string;
    razorpaySignatureId:string;
    classPricingId:number
}

export const PUT = async(req:NextRequest)=>{

    const response = await authStudent(req)

    if(response.message){
        return NextResponse.json(response,response)
    }
    const student = response.student
    const {razorpayOrderId,razorpayPaymentId, razorpaySignatureId,classPricingId}:PaymentVerifyBody = await req.json()

    if(!verifySignature({orderId:razorpayOrderId,razorpaySignature:razorpaySignatureId,paymentId:razorpayPaymentId})){
      return NextResponse.json({message:"Payment failed"},{status:400})
    }

    const findCollegeFeePaymentByStudent = await prisma.collegeFeePaymentByStudent.findFirst({
      where:{
        studentId:student?.id,
        id:classPricingId
      },
      include:{
        collegeClassPricing:true
      }
    })
    const updatedStudentPayment = await prisma.collegeFeePaymentByStudent.update({
      where:{
        studentId:student?.id,
        id:classPricingId
      },
      data:{
        status:"Successfully",
        transactionId:razorpayPaymentId,
        expireDuration: Number(findCollegeFeePaymentByStudent?.collegeClassPricing.duration)*7
      }
    })

    return NextResponse.json(updatedStudentPayment,{status:200})
}