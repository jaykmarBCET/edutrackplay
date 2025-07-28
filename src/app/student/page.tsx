'use client'
import { useRouter } from 'next/navigation'
import React from 'react'
import EduSyncCard from '@/components/home/EduSyncCard'

function StudentPage() {
  const router = useRouter()
  return (
    <div className='flex flex-wrap justify-center items-center-safe gap-4 bg-gray-100 min-h-screen'>

      <EduSyncCard className='' href="registration" name="Login" />

      <EduSyncCard className='' href="/student/login?id=login" name="Student Login" />
      <EduSyncCard className='' href="/parent/login?id=login" name="Parent Login" />
      <EduSyncCard className='' href="/college/login?id=login" name="College Login" />
      <EduSyncCard className='' href="/coaching/login?id=login" name="Coaching Login" />

      <EduSyncCard className='' href="/student/register?id=register" name="Student Register" />
      <EduSyncCard className='' href="/parent/register?id=register" name="Parent Register" />
      <EduSyncCard className='' href="/college/register?id=register" name="College Register" />
      <EduSyncCard className='' href="/coaching/register?id=register" name="Coaching Register" />

    </div>
  )
}

export default StudentPage
