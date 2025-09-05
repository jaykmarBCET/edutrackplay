'use client'
import { useStudentPaymentDue } from '@/context/student/student.context'
import { StudentPaymentProvider } from '@/context/student/StudentPaymentProvider'
import Image from 'next/image'
import React from 'react'
import { Button } from '@/components/ui/button'
import Script from 'next/script'
import axios from 'axios'
import { AllRoot } from '@/constants/Routes'
import { useStudentStore } from '@/store/Student.store'


declare global {
    interface Window {
        Razorpay: any
    }
}

function PaymentPage() {
    return (
        <StudentPaymentProvider>
            <div className="min-h-screen flex flex-col items-center justify-center p-6">
                <StudentPaymentCard />
            </div>
        </StudentPaymentProvider>
    )
}

export default PaymentPage

const StudentPaymentCard = () => {
    const { studentPaymentDue } = useStudentPaymentDue()
    const { student } = useStudentStore()

    if (!studentPaymentDue || studentPaymentDue.length === 0) {
        return (
            <div className="text-center text-gray-500 mt-10">
                <p className="text-xl font-semibold">🎉 No pending payments!</p>
            </div>
        )
    }

    const handelPayment = async (classPricingId: number) => {
        const response = await axios.post(AllRoot.StudentFeePaymentOfClassPrePay, {
            classPricingId
        })

        const data = response.data;

        if (!data.orderId) return;

        const option = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_API_KEY,
            amount: data.amount,
            currency: "INR",
            name: "EduTrackPlay",
            description: "Educational Platform",
            order_id: data.orderId,
            handler: async function (response: any) {
                const razorpayOrderId = response.razorpay_order_id
                const razorpayPaymentId = response.razorpay_payment_id
                const razorpaySignatureId = response.razorpay_signature
                const verifyResponse = await axios.put(AllRoot.StudentFeePaymentOfClassPrePayVerify, {
                    razorpayOrderId,
                    razorpayPaymentId,
                    razorpaySignatureId,
                    classPricingId
                    
                })
                console.log(verifyResponse)
            },
            preFill: {
                name: student?.name,
                email: student?.email,
                contact: student?.phone
            },
            theme: {
                color: "#3399cc"
            }


        }

        if (!option.key) throw Error("Missing Razor Api Key")

        const rzp1 = new window.Razorpay(option)
        rzp1.open()
    }
    return (
        <div className="w-full max-w-2xl flex flex-col gap-6">
            <Script src='https://checkout.razorpay.com/v1/checkout.js' />
            <h1 className="text-3xl font-bold italic text-center mb-4">Student Payment Due</h1>

            {studentPaymentDue.map((item) => (
                <div
                    key={item.id}
                    className="p-6 rounded-2xl shadow-md border border-gray-200 flex flex-col gap-4"
                >
                    {/* College Info */}
                    <div className="flex gap-4 items-center">
                        <Image
                            className="w-12 h-12 rounded-full object-cover"
                            width={48}
                            height={48}
                            src={item.college?.logo as string}
                            alt={`${item.college?.title} Logo`}
                        />
                        <div>
                            <p className="text-xl font-bold italic">{item.college?.title}</p>
                            <p className="text-md text-gray-600">{item.college?.address}</p>
                        </div>
                    </div>

                    {/* Class Info */}
                    <div className="flex justify-between">
                        <p className="text-sm font-medium">Class: {item.class.stander}</p>
                        <p className="text-sm font-medium">Field: {item.class.field}</p>
                    </div>

                    {/* Payment Info */}
                    <div className="flex justify-between items-center">
                        <p className="text-lg font-semibold">₹{item.price}</p>
                        <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold
                            ${item.status === 'Pending'
                                    ? 'bg-yellow-100 text-yellow-700'
                                    : item.status === 'Successfully'
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-red-100 text-red-700'
                                }`}
                        >
                            {item.status}
                            
                        </span>
                        <p className='block bg-white'>TransactionId: {item.transactionId}</p>
                    </div>

                    {/* Pay Button */}
                    {(item.status === 'Pending' || item.status ==='Failed' ) && (
                        <Button
                            className="w-full bg-green-500 hover:bg-green-600"
                            onClick={() => handelPayment(item.id)}
                        >
                            Pay Now
                        </Button>
                    )}
                </div>
            ))}

        </div>
    )
}
