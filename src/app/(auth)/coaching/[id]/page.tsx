'use client'
import CoachingLogin from '@/components/auth/CoachingLogin';
import CoachingRegister from '@/components/auth/CoachingRegister';
import { useSearchParams } from 'next/navigation'
import React, { useState } from 'react'

function CoachingAccount() {
  const searchParams = useSearchParams()
  const id = searchParams.get("id") as "login" | "register";
  const [switcher , setSwitcher] = useState<"login"| "register">(id)
  const handelSwitcher = ()=>{
    setSwitcher((prev)=>prev==='login'?"register":"login")
  }

  if(switcher==='login'){

    return <CoachingLogin handelSwitcher={handelSwitcher}/>
  }
  return <CoachingRegister handelSwitcher={handelSwitcher}/>
}

export default CoachingAccount