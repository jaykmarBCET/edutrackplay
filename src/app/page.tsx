'use client'
import { useRouter } from 'next/navigation'
import React from 'react'
function Home() {
  const router = useRouter()
  return (
    <div className='flex flex-col gap-4'>

      <button className='px-2 py-2 bg-blue-500 rounded-2xl' onClick={()=>router.push("/student/login?id=login")} > Student login</button>
      <button className='px-2 py-2 bg-blue-500 rounded-2xl' onClick={()=>router.push("/parent/login?id=login")} > Parent login</button>
      <button className='px-2 py-2 bg-blue-500 rounded-2xl' onClick={()=>router.push("/college/login?id=login")} >College login</button>
      <button className='px-2 py-2 bg-blue-500 rounded-2xl' onClick={()=>router.push("/coaching/login?id=login")} >Coaching login</button>
      <button className='px-2 py-2 bg-blue-500 rounded-2xl' onClick={()=>router.push("/student/register?id=register")} > Student register</button>
      <button className='px-2 py-2 bg-blue-500 rounded-2xl' onClick={()=>router.push("/parent/register?id=register")} > Parent register</button>
      <button className='px-2 py-2 bg-blue-500 rounded-2xl' onClick={()=>router.push("/college/register?id=register")} >College register</button>
      <button className='px-2 py-2 bg-blue-500 rounded-2xl' onClick={()=>router.push("/coaching/register?id=register")} >Coaching register</button>
      
    </div>
  )
}

export default Home