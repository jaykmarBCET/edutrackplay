'use client'
import StudentLogin from '@/components/auth/StudentLogin';
import StudentRegister from '@/components/auth/StudentRegister';
import { useSearchParams } from 'next/navigation'
import React, { useState } from 'react'

function StudentAccount() {
  const searchParams = useSearchParams()
  const id = searchParams.get("id") as "login" | "register";
  const [switcher , setSwitcher] = useState<"login"| "register">(id)
  const handelSwitcher = ()=>{
    setSwitcher((prev)=>prev==='login'?"register":"login")
  }

  if(switcher==='login'){

    return <StudentLogin handelSwitcher={handelSwitcher}/>
  }
  return <StudentRegister handelSwitcher={handelSwitcher}/>
}

export default StudentAccount