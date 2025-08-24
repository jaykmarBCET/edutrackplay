import { useCollegeList } from '@/context/college/college.context'
import { CollegeListInfo } from '@/store/Student.store'
import React from 'react'
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

function CollegeList() {
    const collegeList = useCollegeList()

    if (!collegeList || collegeList.length === 0) {
        return (
            <div className="text-center mt-10 text-gray-500 text-lg">
                Empty College List
            </div>
        )
    }

    return (
        <div className=" mx-auto px-4 py-8 bg-gray-900 w-[100vw]  min-h-[100vh]">
            <h1 className="text-3xl italic  text-white font-bold mb-6 text-center sm:text-left">College List</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-2">
                {collegeList.map((item, idx) => (
                    <CollegeListCard key={idx} college={item} />
                ))}
            </div>
        </div>
    )
}

export default CollegeList

const CollegeListCard = ({ college }: { college: CollegeListInfo }) => {
    const pricing = college.pricings?.[0]
    const router = useRouter()

    return (
        <Card className="hover:shadow-lg transition-shadow duration-300 border border-gray-200 rounded-2xl flex flex-col justify-between">
            <div>
                <CardHeader className="pb-2">
                    <div className='flex flex-wrap gap-2'>
                        <Image src={college.logo} alt='LOGO' className=' rounded-full' width={"25"} height={"25"} />
                        <CardTitle className="text-xl font-semibold break-words">{college.title}</CardTitle>

                    </div>
                    {college.field && <p className="text-sm text-gray-500 break-words">{college.field}</p>}
                    {college.description && college.description !== 'undefined' && (
                        <CardDescription className="text-gray-600 mt-1 break-words">{college.description}</CardDescription>
                    )}
                </CardHeader>

                {pricing && (
                    <CardContent className="pt-2 space-y-1 text-gray-700">
                        <p>
                            <span className="font-medium">Duration:</span> {pricing.duration} Week
                        </p>
                        <p>
                            <span className="font-medium">Stander:</span> {pricing.stander}
                        </p>
                        <p>
                            <span className="font-medium">Price:</span> ₹{pricing.price}
                        </p>
                    </CardContent>
                )}
            </div>

            <CardAction className="p-4 pt-0">
                <Button onClick={()=>router.push(`/student/admission/${college.id}`)} className="w-full">Admission Now</Button>
            </CardAction>
        </Card>
    )
}