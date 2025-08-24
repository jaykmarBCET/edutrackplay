'use client'
import CollegeList from '@/components/college/CollegeList'
import { CollegeListProvider } from '@/context/college/CollegeListProvider.context'
import React from 'react'


function CollegeListPage() {


  return (
    <CollegeListProvider>
      <div className='w-screen min-h-[100vh]'>
        <CollegeList />

      </div>
    </CollegeListProvider>
  )
}

export default CollegeListPage