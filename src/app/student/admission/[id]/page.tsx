'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useCollegePriceById } from '@/context/college/college.context'
import { CollegeClassPricingProvider } from '@/context/college/CollegeClassPricingProvider'
import { useStudentCollegeAdmissionStore, StudentMakeRequestForCollegeInfo } from '@/store/Student.store'
import { Label } from '@radix-ui/react-label'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

interface StudentAdmissionPageProps {
  params: Promise<{ id: string }>
}

const StudentAdmissionPage: React.FC<StudentAdmissionPageProps> = ({ params }) => {
  const { id } = React.use(params)

  return (
    <CollegeClassPricingProvider>
      <div className="bg-gray-900 min-h-screen flex items-center justify-center px-4 py-8">
        <CollegeClassPricingCard id={id} />
      </div>
    </CollegeClassPricingProvider>
  )
}

export default StudentAdmissionPage

const CollegeClassPricingCard = ({ id }: { id: string }) => {
  const { collegeAndPriceInfo, getCollegePriceInfo } = useCollegePriceById()
  const { studentAdmissionRequestForCollegeCreate } = useStudentCollegeAdmissionStore()
  
  const [studentRequestInfo, setStudentRequestInfo] = useState<StudentMakeRequestForCollegeInfo>({
    collegeId: 0,
    field: '',
    stander: 0,
    description: '',
    title: 'College Admission Request'
  })

  useEffect(() => {
    getCollegePriceInfo(id)
  }, [getCollegePriceInfo, id])

  useEffect(() => {
    if (collegeAndPriceInfo) {
      setStudentRequestInfo({
        collegeId: collegeAndPriceInfo.id,
        field: collegeAndPriceInfo.field || '',
        stander: collegeAndPriceInfo.pricings?.[0]?.stander || 0,
        description: '',
        title: 'College Admission Request'
      })
    }
  }, [collegeAndPriceInfo])

  const handelSubmit = async () => {
    if (collegeAndPriceInfo?.id !== studentRequestInfo.collegeId) return
    if (collegeAndPriceInfo?.pricings?.[0]?.stander !== Number(studentRequestInfo.stander)) return
    await studentAdmissionRequestForCollegeCreate(studentRequestInfo)
  }

  if (!collegeAndPriceInfo) {
    return (
      <Card className="bg-gray-800 text-white w-full max-w-md">
        <CardHeader>
          <CardTitle>Empty College</CardTitle>
        </CardHeader>
      </Card>
    )
  }

  const priceInfo = collegeAndPriceInfo.pricings

  return (
    <Card className="p-6 shadow-lg hover:shadow-xl transition-shadow rounded-2xl bg-white w-full max-w-md">
      {/* College Header */}
      <div className="flex items-center gap-4 mb-4">
        {collegeAndPriceInfo.logo && (
          <Image src={collegeAndPriceInfo.logo} alt={collegeAndPriceInfo.title} width={50} height={50} className="rounded-full" />
        )}
        <CardTitle className="text-2xl font-semibold">{collegeAndPriceInfo.title}</CardTitle>
      </div>

      <CardDescription className="text-gray-600 mb-4">{collegeAndPriceInfo.description}</CardDescription>

      {/* College Info */}
      <CardContent className="space-y-2 mb-6">
        {collegeAndPriceInfo.field && (
          <p className="text-gray-700"><span className="font-medium">Field:</span> {collegeAndPriceInfo.field}</p>
        )}
        {priceInfo && priceInfo.length > 0 && (
          <div className="space-y-1 text-gray-700">
            <p><span className="font-medium">Duration:</span> {priceInfo[0].duration} Weeks</p>
            <p><span className="font-medium">Class (Stander):</span> {priceInfo[0].stander}</p>
            <p><span className="font-medium">Price:</span> ₹{priceInfo[0].price}</p>
          </div>
        )}
      </CardContent>

      {/* Admission Request Form */}
      <div className="space-y-3">
        <div className="flex flex-col">
          <Label htmlFor="request" className="mb-1 text-sm font-medium text-gray-700">Request Type</Label>
          <Input value={studentRequestInfo.title} readOnly disabled />
        </div>

        <div className="flex flex-col">
          <Label htmlFor="stander" className="mb-1 text-sm font-medium text-gray-700">Class (Stander)</Label>
          <Input value={studentRequestInfo.stander} readOnly disabled />
        </div>

        <div className="flex flex-col">
          <Label htmlFor="field" className="mb-1 text-sm font-medium text-gray-700">Field</Label>
          <Input value={studentRequestInfo.field} readOnly disabled />
        </div>

        <div className="flex flex-col">
          <Label htmlFor="description" className="mb-1 text-sm font-medium text-gray-700">Description</Label>
          <Textarea
            placeholder="Write your query"
            value={studentRequestInfo.description}
            onChange={(e) => setStudentRequestInfo({ ...studentRequestInfo, description: e.target.value })}
            className="resize-none"
          />
        </div>

        <Button onClick={handelSubmit} className="w-full mt-2">
          Make Request
        </Button>
      </div>
    </Card>
  )
}
