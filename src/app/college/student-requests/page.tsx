'use client'

import { Button } from '@/components/ui/button'
import { useStudentProfile, useStudentRequestForCollege } from '@/context/student/student.context'
import { StudentProfileProvider } from '@/context/student/StudentProfileProvider'
import { StudentRequestProvider } from '@/context/student/StudentRequestProvider'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function StudentRequestPage() {
  return (
    <StudentRequestProvider>
      <div className="p-6">
        <h1 className="text-2xl italic font-bold text-center">Student Request List</h1>
        <StudentAdmissionRequestCard />
      </div>
    </StudentRequestProvider>
  )
}

function StudentAdmissionRequestCard() {
  const studentRequest = useStudentRequestForCollege()
  const router = useRouter()

  if (!studentRequest || studentRequest.length === 0) {
    return <div className="text-center text-gray-500 mt-6">Empty Request</div>
  }

  const handelAccept = async(requestId:number)=>{
    router.push(`/college/student-requests/${requestId}`)
  }
  

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {studentRequest.map((item) => (
        <div
          key={item.id}
          className="bg-white w-80 mx-auto max-h-96 rounded-2xl shadow-md p-5 hover:shadow-lg transition-all duration-300"
        >
          <h2 className="text-xl font-semibold">{item.title}</h2>
          <p className="text-sm text-gray-600 mt-2">{item.description}</p>

          <div className="mt-3 space-y-1 text-sm text-gray-700">
            <p>
              <span className="font-medium">Field:</span> {item.field}
            </p>
            <p>
              <span className="font-medium">Standard:</span> {item.stander}
            </p>
            <p className="text-xs text-gray-400">
              Apply Date: {new Date(item.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="flex flex-col mt-4 space-y-2">
            <Button onClick={()=>{
              const isConfirm = confirm("Are you sure")

              if(isConfirm){
                handelAccept(item.id)
              }
            }}
              className={`px-4 py-1 ${
                item.isAccept ? 'bg-green-400 hover:bg-green-500' : 'bg-green-500 hover:bg-green-600'
              }`}
            >
              {item.isAccept ? 'Accepted' : 'Accept'}
            </Button>

            <StudentProfileCard studentId={item.studentId} />

            <Button  className="px-4 py-1 bg-red-500 hover:bg-red-600">
              Reject
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

const StudentProfileCard = ({ studentId }: { studentId: number }) => {
  const [open, setOpen] = useState(false)

  return (
    <StudentProfileProvider>
      {open ? (
        <ProfileCard studentId={studentId} onClose={() => setOpen(false)} />
      ) : (
        <Button className="px-4 py-1 bg-blue-500 hover:bg-blue-600" onClick={() => setOpen(true)}>
          View Profile
        </Button>
      )}
    </StudentProfileProvider>
  )
}

const ProfileCard = ({ studentId, onClose }: { studentId: number; onClose: () => void }) => {
  const { studentProfile, getStudent } = useStudentProfile()

  useEffect(() => {
    getStudent(studentId)
  }, [ studentId])

  if (!studentProfile) {
    return <div className="text-center text-gray-500">Loading...</div>
  }

  return (
    <div className="max-w-sm mx-auto mt-3 bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center space-y-4 relative">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl"
      >
        ✖
      </button>

      <Image
        width={80}
        height={80}
        className="rounded-full object-cover border-2 border-gray-200"
        src={studentProfile.avatar}
        alt={studentProfile.name}
      />

      <div className="text-center">
        <p className="text-xl font-semibold">{studentProfile.name}</p>
        <p className="text-gray-500 text-sm">{studentProfile.email}</p>
      </div>

      <div className="w-full space-y-2 text-gray-700 text-sm">
        {studentProfile.phone && (
          <p>📞 <span className="font-medium">{studentProfile.phone}</span></p>
        )}
        <p>🎂 <span className="font-medium">{studentProfile.dob}</span></p>
        <p>📍 <span className="font-medium">{studentProfile.address}</span></p>
      </div>
    </div>
  )
}


