'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  UserIcon,
  DocumentTextIcon,
  BellIcon,
  BookOpenIcon,
  UserGroupIcon,
  CreditCardIcon,
  ChartBarIcon,
  ChatBubbleLeftRightIcon,
  AcademicCapIcon,
  KeyIcon,
  ArrowRightOnRectangleIcon,
  ArrowLeftOnRectangleIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import Image from 'next/image';

// A reusable card component for the dashboard sections.
const DashboardCard = ({ title, description, icon: Icon }) => (
  // Updated background and text colors for a dark theme
  <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center transition-transform transform hover:scale-105 duration-300">
    <div className="p-4 bg-indigo-600 text-white rounded-full mb-4">
      <Icon className="h-10 w-10" />
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-sm text-gray-400">{description}</p>
  </div>
);

// New component for the detailed profile section
const CollegeProfileSection = ({ ownerName, collegeName }) => (
  // Updated background and text colors for a dark theme
  <div className="bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center transition-transform transform duration-300 row-span-2">
    <div className="flex flex-col items-center mb-4">
      {/* College Logo */}
      <div className="p-4 bg-indigo-600 text-white rounded-full mb-2">
        <AcademicCapIcon className="h-12 w-12" />
      </div>
      <h3 className="text-2xl font-bold text-white">{collegeName}</h3>
      <p className="text-md text-gray-400 mt-1">Managed by: {ownerName}</p>
    </div>

    {/* Updated divider color */}
    <div className="w-full h-px bg-gray-700 my-4" />

    {/* Profile Actions */}
    <div className="flex flex-col w-full space-y-3">
      <button
        onClick={() => alert('Update details functionality goes here')}
        className="flex items-center justify-center gap-2 p-3 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 transition-colors"
      >
        <ArrowPathIcon className="h-5 w-5" />
        Update Details
      </button>
      <button
        onClick={() => alert('Change password functionality goes here')}
        className="flex items-center justify-center gap-2 p-3 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 transition-colors"
      >
        <KeyIcon className="h-5 w-5" />
        Change Password
      </button>
      <button
        onClick={() => alert('Logout functionality goes here')}
        className="flex items-center justify-center gap-2 p-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
      >
        <ArrowRightOnRectangleIcon className="h-5 w-5" />
        Logout
      </button>
      <button
        onClick={() => alert('Email functionality goes here')}
        className="flex items-center justify-center gap-2 p-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
      >
        <ArrowLeftOnRectangleIcon className="h-5 w-5" />
        Change Email
      </button>
    </div>
  </div>
);

// Main CollegePage component
function CollegePage() {
  const router = useRouter();

  const dashboardItems = [
    {
      title: 'Student Requests',
      description: 'Manage student applications and requests for admission.',
      icon: DocumentTextIcon,
    },
    {
      title: 'Notifications',
      description: 'Stay updated with all the latest alerts and announcements.',
      icon: BellIcon,
    },
    {
      title: 'Classes',
      description: 'Organize and manage all academic classes and courses.',
      icon: BookOpenIcon,
    },
    {
      title: 'Teachers',
      description: 'View and manage the directory of all teachers and staff.',
      icon: UserGroupIcon,
    },
    {
      title: 'Payment Due',
      description: 'Track and manage upcoming fee payments and financial records.',
      icon: CreditCardIcon,
    },
    {
      title: 'Student Progress',
      description: 'Monitor the academic performance and progress of students.',
      icon: ChartBarIcon,
    },
    {
      title: 'Teacher Feedback',
      description: 'Review and provide feedback on teacher performance.',
      icon: ChatBubbleLeftRightIcon,
    },
  ];

  return (
    // Updated main background and header text color for a dark theme
    <div className='bg-gray-900 min-h-screen p-8'>
      <div className="flex items-center justify-center mb-10">
        <h1 className="text-4xl font-extrabold text-white flex items-center gap-3">
          <AcademicCapIcon className="h-10 w-10 text-indigo-600" />
          College Dashboard
        </h1>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto'>
        {/* The new Profile Section component is placed here */}
        <CollegeProfileSection ownerName="John Doe" collegeName="Bengal College of Engineering and Technology" />

        {/* The rest of the dashboard cards */}
        {dashboardItems.map((item, index) => (
          <DashboardCard
            key={index}
            title={item.title}
            description={item.description}
            icon={item.icon}
          />
        ))}
      </div>
    </div>
  );
}

export default CollegePage;
