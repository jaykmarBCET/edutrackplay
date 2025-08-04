'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParentStore } from '@/store/Parent.store';
import { AddStudent } from '@/components/parent/AddStudent';
import { ParentUpdate } from '@/components/parent/ParentUpdate';
import {
  UserCircleIcon,
  PhoneIcon,
  EnvelopeIcon,
  CakeIcon,
  ArrowRightOnRectangleIcon,
  PencilSquareIcon,
  KeyIcon,
  PlusCircleIcon,
  UsersIcon,
  EyeIcon // For 'Show Activity'
} from '@heroicons/react/24/outline'; // Importing Heroicons

function ParentPage() {
  const router = useRouter();
  const { parent, getParent, getChildren, student, logoutParent } = useParentStore();
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [showUpdateParentModal, setShowUpdateParentModal] = useState(false);

  const toggleAddStudentModal = () => setShowAddStudentModal((prev) => !prev);
  const toggleUpdateParentModal = () => setShowUpdateParentModal((prev) => !prev);

  useEffect(() => {
    getParent();
  }, [getParent]);

  useEffect(() => {
    if (parent?.id) {
      getChildren();
    }
  }, [getChildren, parent?.id]);

  useEffect(() => {
    if (!parent?.email) {
      router.push('/parent/login?id=login');
    }
  }, [parent?.email, router]);

  return (
    <div className="flex flex-col lg:flex-row gap-8 bg-gray-50 min-h-screen p-8 font-sans text-gray-800">
      {/* --- Parent Info Sidebar --- */}
      <aside className="w-full lg:w-1/4 bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col p-6">
        <div className="flex flex-col items-center gap-4 border-b pb-6 mb-6 border-gray-100">
          <Image
            className="rounded-full border-4 border-indigo-200 shadow-md transform transition-transform hover:scale-105"
            width={120}
            height={120}
            src={'/avatar-placeholder.png'} 
            alt="Parent Avatar"
          />
          <div className="text-center">
            <p className="text-2xl font-extrabold text-gray-900">{parent?.name || 'Parent Name'}</p>
            {parent?.age && <p className="text-sm text-gray-600 flex items-center justify-center gap-1 mt-1"><CakeIcon className="h-4 w-4 text-gray-400" /> {parent.age} years old</p>}
            {parent?.email && <p className="text-sm text-gray-600 flex items-center justify-center gap-1"><EnvelopeIcon className="h-4 w-4 text-gray-400" /> {parent.email}</p>}
            {parent?.phone && <p className="text-sm text-gray-600 flex items-center justify-center gap-1"><PhoneIcon className="h-4 w-4 text-gray-400" /> {parent.phone}</p>}
          </div>
        </div>

        {/* --- Parent Actions --- */}
        <nav className="flex flex-col gap-4">
          <button
            onClick={toggleUpdateParentModal}
            className="flex items-center justify-center gap-2 px-5 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <PencilSquareIcon className="h-5 w-5" /> Update Profile
          </button>
          <button
            onClick={() => alert('Change Password functionality coming soon!')} // Placeholder for change password
            className="flex items-center justify-center gap-2 px-5 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            <KeyIcon className="h-5 w-5" /> Change Password
          </button>
          <div className="border-t border-gray-100 my-4"></div> {/* Separator */}
          <button
            onClick={logoutParent}
            className="flex items-center justify-center gap-2 px-5 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            <ArrowRightOnRectangleIcon className="h-5 w-5" /> Logout
          </button>
        </nav>
      </aside>

      {/* --- Children Info Main Content --- */}
      <main className="flex-1 min-h-[80vh] bg-white rounded-3xl shadow-lg p-8 flex flex-col">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <UsersIcon className="h-8 w-8 text-indigo-500" />
            My Children
          </h2>
          <button
            onClick={toggleAddStudentModal}
            className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            <PlusCircleIcon className="h-5 w-5" /> Add New Student
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-grow">
          {student.length > 0 ? (
            student.map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-center p-6 border border-gray-200 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
              >
                <Image
                  className="rounded-full border-4 border-indigo-100 mb-4 shadow-sm"
                  width={80}
                  height={80}
                  src={item?.avatar as string || '/avatar-placeholder.png'}
                  alt="Student Avatar"
                />
                <div className="text-center mb-4">
                  <p className="text-xl font-bold text-gray-900">{item?.name}</p>
                  <p className="text-sm text-gray-600 flex items-center justify-center gap-1 mt-1">
                    <CakeIcon className="h-4 w-4 text-gray-400" /> {new Date(item?.dob).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center justify-center gap-1">
                    <EnvelopeIcon className="h-4 w-4 text-gray-400" /> {item?.email}
                  </p>
                </div>
                <button className="flex items-center gap-2 px-5 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-all shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  <EyeIcon className="h-4 w-4" /> View Activity
                </button>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-gray-500 text-lg">
              No students added yet. Click "Add New Student" to get started!
            </div>
          )}
        </div>
      </main>

      {/* --- Modals --- */}
      {showAddStudentModal && <AddStudent onCancel={toggleAddStudentModal} />}
      {showUpdateParentModal && <ParentUpdate onCancel={toggleUpdateParentModal} />}
    </div>
  );
}

export default ParentPage;