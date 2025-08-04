'use client'
import { useStudentStore } from '@/store/Student.store'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import {
  BellIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  UserCircleIcon,
  KeyIcon,
  AtSymbolIcon,
  BookOpenIcon,
  ClipboardDocumentListIcon,
  SparklesIcon,
  AcademicCapIcon,
  BuildingLibraryIcon,
} from '@heroicons/react/24/outline' 

function StudentPage() {
  const router = useRouter()
  const { student, getStudent } = useStudentStore()

  useEffect(() => {
    getStudent()
  }, [getStudent])

  const handleLogout = () => {
    toast.success('Logged out successfully!')
    router.push('/student/login?id=login')
  }

  const handleUpdateProfile = () => router.push('/student/update')
  const handleChangePassword = () => router.push('/student/change-password')
  const handleChangeEmail = () => router.push('/student/change-email')


  const DashboardCard = ({ title, icon: Icon, children, onClick }) => (
    <div
      className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer flex flex-col items-start"
      onClick={onClick}
    >
      <div className="flex items-center mb-4">
        {Icon && <Icon className="h-7 w-7 text-indigo-500 mr-3" />}
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      </div>
      <p className="text-gray-600 text-sm">{children}</p>
    </div>
  )

  return (
    <div className='flex flex-col lg:flex-row gap-8 bg-gray-50 min-h-screen p-8 font-sans'>
      {/* Sidebar */}
      <aside className='w-full lg:w-1/4 bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col'>
        {/* Cover Image */}
        <div className='relative h-40 w-full bg-gradient-to-r from-purple-500 to-indigo-600'>
          <Image
            src="/cover-placeholder.jpg" // Using a placeholder for now, ideally dynamic
            fill
            className='object-cover opacity-60'
            alt='Cover'
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-white text-3xl font-bold drop-shadow-lg">Student Hub</h1>
          </div>
        </div>

        {/* Student Info */}
        <div className='p-6 flex flex-col items-center text-center -mt-16 z-10'>
          <Image
            alt='student avatar'
            width={100}
            height={100}
            className='rounded-full border-4 border-white bg-gray-200 shadow-md transition-transform transform hover:scale-105'
            src={student?.avatar as string || '/avatar-placeholder.png'}
          />
          <p className='font-extrabold text-2xl mt-3 text-gray-900'>{student?.name || 'Guest Student'}</p>
          <p className='text-md text-gray-600'>{student?.email || 'guest@example.com'}</p>
          <span className='text-xs bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full mt-2 font-medium'>Student</span>
        </div>

        {/* Actions */}
        <nav className='flex flex-col gap-3 px-6 pb-6 mt-4'>
          <button
            onClick={handleUpdateProfile}
            className='flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition-colors duration-200 shadow-md hover:shadow-lg'
          >
            <UserCircleIcon className="h-5 w-5" /> Update Profile
          </button>
          <button
            onClick={handleChangePassword}
            className='flex items-center justify-center gap-2 bg-yellow-500 text-white py-3 rounded-xl hover:bg-yellow-600 transition-colors duration-200 shadow-md hover:shadow-lg'
          >
            <KeyIcon className="h-5 w-5" /> Change Password
          </button>
          <button
            onClick={handleChangeEmail}
            className='flex items-center justify-center gap-2 bg-purple-500 text-white py-3 rounded-xl hover:bg-purple-600 transition-colors duration-200 shadow-md hover:shadow-lg'
          >
            <AtSymbolIcon className="h-5 w-5" /> Change Email
          </button>
          <div className="border-t border-gray-200 my-4"></div> {/* Separator */}
          <button
            onClick={handleLogout}
            className='flex items-center justify-center gap-2 bg-red-500 text-white py-3 rounded-xl hover:bg-red-600 transition-colors duration-200 shadow-md hover:shadow-lg'
          >
            <ArrowRightOnRectangleIcon className="h-5 w-5" /> Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className='flex-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
        <DashboardCard
          title="My Classes"
          icon={BookOpenIcon}
          onClick={() => toast('Navigating to Classes!')} // Example action
        >
          View your enrolled courses and lecture schedules.
        </DashboardCard>
        <DashboardCard
          title="Assignments"
          icon={ClipboardDocumentListIcon}
          onClick={() => toast('Checking Assignments!')}
        >
          Check upcoming deadlines and submit your work.
        </DashboardCard>
        <DashboardCard
          title="Upcoming Events"
          icon={SparklesIcon}
          onClick={() => toast('Exploring Events!')}
        >
          Stay updated with campus activities and important dates.
        </DashboardCard>
        <DashboardCard
          title="Exams & Grades"
          icon={AcademicCapIcon}
          onClick={() => toast('Reviewing Exams and Grades!')}
        >
          Access your exam schedule and academic results.
        </DashboardCard>
        <DashboardCard
          title="College Admission List"
          icon={BuildingLibraryIcon}
          onClick={() => toast('Looking at College List!')}
        >
          Explore potential colleges and admission requirements.
        </DashboardCard>
        <DashboardCard
          title="Notifications"
          icon={BellIcon}
          onClick={() => toast('Opening Notifications!')}
        >
          View all your important alerts and announcements.
        </DashboardCard>
        <DashboardCard
          title="Settings"
          icon={Cog6ToothIcon}
          onClick={() => toast('Adjusting Settings!')}
        >
          Manage your account preferences and privacy.
        </DashboardCard>
      </main>
    </div>
  )
}

export default StudentPage