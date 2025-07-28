'use client'
import React from 'react'
import NavCard from '@/components/home/NavCard'
import { FaUniversity, FaUserGraduate, FaUserTie, FaChalkboardTeacher } from 'react-icons/fa'

function Home() {
  const links = [
    { name: 'College', icon: FaUniversity, href: '/college/login?id=login', color: 'text-blue-600' },
    { name: 'Student', icon: FaUserGraduate, href: '/student/login?id=login', color: 'text-green-600' },
    { name: 'Parent', icon: FaUserTie, href: '/parent/login?id=login', color: 'text-purple-600' },
    { name: 'Coaching', icon: FaChalkboardTeacher, href: '/coaching/login?id=login', color: 'text-orange-500' },
  ]

  return (
    <div className='min-h-screen bg-gray-100 flex justify-center items-center flex-col py-10 px-4'>
      <h1 className='text-3xl font-bold text-center mb-8 text-blue-700'>Select Your Portal</h1>
      <div className='flex flex-wrap justify-center gap-6'>
        {links.map((item) => (
          <NavCard key={item.name} {...item} />
        ))}
      </div>
    </div>
  )
}

export default Home
