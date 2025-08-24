import Razorpay from 'razorpay'
import { PrismaClient } from '@/generated/prisma'
import crypto from "crypto"


const config = {
    razorpaySecretKey: process.env.RAZORPAY_SECRET_KEY_ID as string,
    razorpayKeyId: process.env.RAZORPAY_API_KEY as string
}

const prisma = new PrismaClient()

const razorpay = new Razorpay({
    key_id: config.razorpayKeyId,
    key_secret: config.razorpaySecretKey
})

export const makeOrderForStudentClassPricing = async (collegeFeePaymentByStudentId: number) => {
    try {
        const currentPrice = await prisma.collegeFeePaymentByStudent.findFirst({ where: { id: collegeFeePaymentByStudentId } })
        if (!currentPrice) {
            throw Error("Invalid paymentId")
        }

        const options = {
            amount: currentPrice.price * 100,
            currency: "INR",
            receipt: "receipt_order_1"
        }
        razorpay.orders.create(options, (error, data) => {
            if (error) {
                throw Error(error.error.reason)
            }

            return data

        })

    } catch (e) {
        const error = e as Error
        console.log(error.message)
        return error
    }
}

export const verifyOrder = async ({ order_id, payment_id, signature, collegeFeePaymentByStudentId }: { order_id: string; payment_id: string, signature: string, collegeFeePaymentByStudentId: number }) => {

    const hmac = crypto.createHmac("sha256", config.razorpaySecretKey)

    hmac.update(order_id + "|" + payment_id)
    const generateSignature = hmac.digest("hex")

    if (signature === generateSignature) {

        const collegeFeePaymentByStudent = await prisma.collegeFeePaymentByStudent.findFirst({ where: { id: collegeFeePaymentByStudentId } })
        if (!collegeFeePaymentByStudent) {
            throw Error("College Fee Payment By Student id is missing")
        }
        const currentClass = await prisma.class.findFirst({ where: { id: collegeFeePaymentByStudent.classId } })
        const classPricing = await prisma.collegeClassPricing.findFirst({ where: { collegeId: Number(currentClass?.collegeId), stander: Number(currentClass?.stander) } })

        if (!currentClass || !classPricing) {
            throw Error("Missing classId")
        }
        const updateFee = await prisma.collegeFeePaymentByStudent.update({
            where: { id: collegeFeePaymentByStudentId },
            data: {
                status: "Successfully",
                transactionId: payment_id,
                expireDuration: currentClass?.session!.getTime() + classPricing?.duration * 7 * 60 * 60 * 100,
            }
        })

        if(!updateFee){
            throw Error()
        }
    }
}