'use client'
import ParentLogin from '@/components/auth/ParentLogin';
import ParentRegister from '@/components/auth/ParentRegister';
import { useSearchParams } from 'next/navigation'
import React, { useState } from 'react'

function ParentAccount() {
  const searchParams = useSearchParams()
  const id = searchParams.get("id") as "login" | "register";
  const [switcher , setSwitcher] = useState<"login"| "register">(id)
  const handelSwitcher = ()=>{
    setSwitcher((prev)=>prev==='login'?"register":"login")
  }

  if(switcher==='login'){

    return <ParentLogin handelSwitcher={handelSwitcher}/>
  }
  return <ParentRegister handelSwitcher={handelSwitcher}/>
}

export default ParentAccount