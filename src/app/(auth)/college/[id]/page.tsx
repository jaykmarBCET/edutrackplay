'use client'
import CollegeLogin from '@/components/auth/CollegeLogin';
import CollegeRegister from '@/components/auth/CollegeRegister';
import { useCollegeStore } from '@/store/College.store';
import {  useSearchParams, useRouter } from 'next/navigation'


import React, { useEffect, useState } from 'react'

function CollegeAccount() {
  const searchParams = useSearchParams()
  const id = searchParams.get("id") as "login" | "register";
  const [switcher , setSwitcher] = useState<"login"| "register">(id)
  const router = useRouter()
  const handelSwitcher = ()=>{
    setSwitcher((prev)=>prev==='login'?"register":"login")
  }
  const  {getCollege,college} = useCollegeStore()
  if(college?.email.trim()){
    router.push("/college")
  }

  useEffect(()=>{
    getCollege()
  },[])

  if(switcher==='login'){

    return <CollegeLogin handelSwitcher={handelSwitcher}/>
  }
  return <CollegeRegister handelSwitcher={handelSwitcher}/>
}

export default CollegeAccount