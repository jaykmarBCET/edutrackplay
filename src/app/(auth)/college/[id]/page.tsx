'use client'
import CollegeLogin from '@/components/auth/CollegeLogin';
import CollegeRegister from '@/components/auth/CollegeRegister';
import { useSearchParams } from 'next/navigation'
import React, { useState } from 'react'

function CollegeAccount() {
  const searchParams = useSearchParams()
  const id = searchParams.get("id") as "login" | "register";
  const [switcher , setSwitcher] = useState<"login"| "register">(id)
  const handelSwitcher = ()=>{
    setSwitcher((prev)=>prev==='login'?"register":"login")
  }

  if(switcher==='login'){

    return <CollegeLogin handelSwitcher={handelSwitcher}/>
  }
  return <CollegeRegister handelSwitcher={handelSwitcher}/>
}

export default CollegeAccount