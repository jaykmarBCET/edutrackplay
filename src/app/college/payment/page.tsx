'use client'

import React from 'react'
import { useCollegePaymentDueList } from '@/context/college/college.context'
import { CollegePaymentProvider } from '@/context/college/CollegePaymentProvider'
import Image from 'next/image'

function PaymentPage() {
  return (
    <CollegePaymentProvider>
      <CollegePaymentCard />
    </CollegePaymentProvider>
  )
}

export default PaymentPage

const CollegePaymentCard = () => {
  const { paymentByStudent, sendMail } = useCollegePaymentDueList()

  if (!paymentByStudent || paymentByStudent.length === 0) {
    return <h1 className="text-center text-xl font-bold italic mt-10">No pending payments 🎉</h1>
  }

  return (
    <div className="w-screen min-h-screen p-6 bg-gray-50">
      <h1 className="text-2xl font-bold italic mb-6">Student Payment Due</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {paymentByStudent.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-md rounded-2xl p-4 flex flex-col gap-2"
          >
            <div className="flex items-center gap-3">
              <Image
                width={48}
                height={48}
                src={item.student.avatar}
                alt={item.student.name}
                className="w-12 h-12 rounded-full border"
              />
              <div>
                <h2 className="font-semibold text-lg">{item.student.name}</h2>
                <p className="text-sm text-gray-600">{item.student.email}</p>
                <p className="text-sm text-gray-600">{item.student.phone}</p>
              </div>
            </div>

            <div className="mt-2 text-sm">
              <p>
                <span className="font-semibold">Price:</span> ₹{item.price}
              </p>
              <p>
                <span className="font-semibold">Status:</span>{' '}
                <span
                  className={`${
                    item.status === 'Pending'
                      ? 'text-red-500 font-bold'
                      : 'text-green-600 font-semibold'
                  }`}
                >
                  {item.status}
                </span>
              </p>
              <p className="text-xs text-gray-500">
                Created: {item.createdAt?.toString().substring(0,10)}
              </p>
            </div>

            <button
              disabled={item.status === 'Successfully'}
              onClick={() => sendMail(Number(item.student.id))}
              className="mt-3 bg-blue-600 text-white px-3 py-1 rounded-xl hover:bg-blue-700 disabled:bg-transparent"
            >
              Send Reminder
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
