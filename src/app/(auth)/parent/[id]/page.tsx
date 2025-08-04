'use client'
import ParentLogin from '@/components/auth/ParentLogin';
import ParentRegister from '@/components/auth/ParentRegister';
import { useParentStore } from '@/store/Parent.store';
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function ParentAccount() {
  const searchParams = useSearchParams()
  const id = searchParams.get("id") as "login" | "register";
  const [switcher , setSwitcher] = useState<"login"| "register">(id)
  
 
  const handelSwitcher = ()=>{
    setSwitcher((prev)=>prev==='login'?"register":"login")
  }
  
  const router = useRouter()
  const {getParent,parent} = useParentStore()

  if(parent?.email){
    router.push("/parent")
  }

  useEffect(()=>{
    getParent()
  },[])

  if(switcher==='login'){

    return <ParentLogin handelSwitcher={handelSwitcher}/>
  }
  return <ParentRegister handelSwitcher={handelSwitcher}/>
}

export default ParentAccount