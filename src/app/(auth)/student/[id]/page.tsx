'use client'
import StudentLogin from '@/components/auth/StudentLogin';
import StudentRegister from '@/components/auth/StudentRegister';
import { useStudentStore } from '@/store/Student.store';
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function StudentAccount() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const id = searchParams.get("id") as "login" | "register";
  const [switcher , setSwitcher] = useState<"login"| "register">(id)
  const handelSwitcher = ()=>{
    setSwitcher((prev)=>prev==='login'?"register":"login")
  }
  const {getStudent,student} = useStudentStore()

  if(student?.email.trim()){
    router.push("/student")
  }

  useEffect(()=>{
    getStudent()
  },[])

  if(switcher==='login'){

    return <StudentLogin handelSwitcher={handelSwitcher}/>
  }
  return <StudentRegister handelSwitcher={handelSwitcher}/>
}

export default StudentAccount