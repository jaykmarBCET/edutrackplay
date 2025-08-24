import { useStudentStore } from '@/store/Student.store'
import type { StudentInfo } from '../../../types/types'
import React, { useState } from 'react'
import { Input } from '../ui/input'
import { Card, CardTitle, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { Label } from '@radix-ui/react-label'
import Image from 'next/image'
import { Circle } from 'lucide-react'


function StudentUpdate({ onCancel }: { onCancel: () => void }) {
  const { student, updateStudent,isLoading } = useStudentStore()
  const [updateStudentInfo, setUpdateStudentInfo] = useState<StudentInfo | null>(student)
  const [avatar, setAvatar] = useState<File | null>(null)
  const [coverImage, setCoverImage] = useState<File | null>(null)

  const handelSave = async()=>{
    if(!updateStudentInfo)return;
    const formData = new FormData()
    formData.append("name", updateStudentInfo.name)
    formData.append("address", updateStudentInfo.address)
    formData.append("gender",updateStudentInfo.gender as string)
    formData.append("phone", updateStudentInfo.phone as string)
    
    if(avatar!==null){
        formData.append("avatar", avatar)
    }
    if(coverImage!== null){

        formData.append("coverImage",coverImage)
    }
    await  updateStudent(formData)
  }

  return (
    <div className="bg-[#29292939] w-full flex justify-center items-center min-h-screen p-4">
      <Card className="w-full max-w-lg overflow-hidden rounded-2xl shadow-lg">
        {/* Cover + Avatar */}
        <div className="relative w-full h-40 bg-gray-200">
          {coverImage && (
            <Image
              src={URL.createObjectURL(coverImage)}
              alt="cover"
              fill
              className="object-cover"
            />
          )}
          {/* Avatar center of cover */}
          {avatar && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src={URL.createObjectURL(avatar)}
                alt="avatar"
                width={96}
                height={96}
                className="rounded-full border-4 border-white object-cover shadow-md"
              />
            </div>
          )}
        </div>

        {/* Form Fields */}
        <CardContent className="flex flex-col gap-3 mt-6">
          <CardTitle className="text-center">Update Student Details</CardTitle>

          <Input
            value={updateStudentInfo?.name || ""}
            placeholder="Enter Name"
            onChange={e =>
              updateStudentInfo &&
              setUpdateStudentInfo({ ...updateStudentInfo, name: e.target.value })
            }
          />

          <Input
            value={updateStudentInfo?.address || ""}
            placeholder="Enter Address"
            onChange={e =>
              updateStudentInfo &&
              setUpdateStudentInfo({ ...updateStudentInfo, address: e.target.value })
            }
          />

          

          <Input
            value={updateStudentInfo?.gender || ""}
            placeholder="Enter Gender"
            onChange={e =>
              updateStudentInfo &&
              setUpdateStudentInfo({
                ...updateStudentInfo,
                gender: e.target.value as "Male" | "Female"
              })
            }
          />

          <Input
            value={updateStudentInfo?.phone || ""}
            placeholder="Enter Phone"
            onChange={e =>
              updateStudentInfo &&
              setUpdateStudentInfo({ ...updateStudentInfo, phone: e.target.value })
            }
          />

          {/* Upload Inputs */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="avatar">Avatar Image</Label>
            <Input
              id="avatar"
              type="file"
              accept="image/*"
              onChange={e => e.target.files?.[0] && setAvatar(e.target.files[0])}
            />

            <Label htmlFor="cover">Cover Image</Label>
            <Input
              id="cover"
              type="file"
              accept="image/*"
              onChange={e => e.target.files?.[0] && setCoverImage(e.target.files[0])}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-2 mt-2">
            <Button onClick={onCancel} variant="secondary" className="flex-1">
              Cancel
            </Button>
            <Button
              onClick={() => handelSave()}
              disabled={!updateStudentInfo}
              className="flex-1"
            >{isLoading?<Circle/>:"Save"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default StudentUpdate
