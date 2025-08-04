'use client';

import React, { useState, useEffect } from 'react';
import {
  UserIcon,
  PhoneIcon,
  EnvelopeIcon,
  LockClosedIcon,
  MapPinIcon,
  AcademicCapIcon,
  GlobeAltIcon,
  PhotoIcon
} from '@heroicons/react/24/outline';
import { CollegeInfo } from '../../../types/types';
import TextInput from '../ui/TextInput';
import toast from 'react-hot-toast';
import Image from 'next/image';
import { useCollegeStore } from '@/store/College.store';

function CollegeRegister({ handelSwitcher }: { handelSwitcher: () => void }) {
  const [college, setCollege] = useState<CollegeInfo>({
    title: '',
    name: '',
    address: '',
    field: '',
    owner_name: '',
    owner_email: '',
    password: '',
    logo: '',
    phone: "",
    email: '',
    website: ''
  });

  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const {createCollege} = useCollegeStore()

  // Clean up the logo preview URL to prevent memory leaks
  useEffect(() => {
    return () => {
      if (logoPreview) {
        URL.revokeObjectURL(logoPreview);
      }
    };
  }, [logoPreview]);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, files } = e.target;

    if (type === 'file' && files && files[0]) {
      const file = files[0];
      if (file.size < 1024 * 1024) {
        // Create a temporary URL for the logo preview
        const url = URL.createObjectURL(file);
        setLogoPreview(url);
        setCollege({ ...college, [name]: url });
      } else {
        toast.error('File size must be less than 1MB');
      }
    } else {
      setCollege({ ...college, [name]: type === 'number' ? +value : value });
    }
  };

  const handelRegister = async() => {
    const formData = new FormData()
    formData.append("name", college.name)
    formData.append("title", college.title)
    formData.append("logo", college.logo as File)
    formData.append("address", college.address)
    await createCollege(formData)
    toast.success('Registration data logged to console!');
  };

  return (
    <div className="flex flex-col items-center bg-gray-900 w-screen min-h-screen text-white px-4 py-8">
      <h1 className="text-3xl font-bold bg-indigo-500 px-6 rounded-xl shadow-md py-3 mt-8">
        College Registration
      </h1>

      <div className="w-full max-w-md border border-gray-700 flex flex-col px-6 py-8 mt-10 rounded-2xl bg-gray-800 mb-8">

        {/* Logo Preview Section */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-24 h-24 rounded-full border-4 border-indigo-500 bg-gray-700 flex items-center justify-center overflow-hidden shadow-inner">
            {logoPreview ? (
              <Image
                width={96}
                height={96}
                src={logoPreview}
                alt="Logo Preview"
                className="object-cover w-full h-full"
              />
            ) : (
              <AcademicCapIcon className="h-16 w-16 text-gray-400" />
            )}
            <label
              htmlFor="logo-upload"
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity duration-200 cursor-pointer rounded-full"
              title="Upload College Logo"
            >
              <PhotoIcon className="h-8 w-8 text-white" />
              <input
                type="file"
                id="logo-upload"
                accept="image/*"
                name="logo"
                onChange={changeHandler}
                className="hidden"
              />
            </label>
          </div>
          <p className="text-sm text-gray-400 mt-2">{logoPreview ? "Change Logo" : "Upload Logo"}</p>
        </div>

        <TextInput Icon={AcademicCapIcon} type="text" name="name" value={college.name} onChange={changeHandler} placeholder=" " label="College Name" color="indigo" />
        <TextInput Icon={AcademicCapIcon} type="text" name="title" value={college.title} onChange={changeHandler} placeholder=" " label="College Title" color="indigo" />
        <TextInput Icon={AcademicCapIcon} type="text" name="field" value={college.field} onChange={changeHandler} placeholder=" " label="Field" color="indigo" />
        <TextInput Icon={UserIcon} type="text" name="owner_name" value={college.owner_name} onChange={changeHandler} placeholder=" " label="Owner Name" color="indigo" />
        <TextInput Icon={EnvelopeIcon} type="email" name="owner_email" value={college.owner_email} onChange={changeHandler} placeholder=" " label="Owner Email" color="indigo" />
        <TextInput Icon={LockClosedIcon} type="password" name="password" value={college.password} onChange={changeHandler} placeholder=" " label="Password" color="indigo" />
        <TextInput Icon={PhoneIcon} type="number" name="phone" value={college.phone || ''} onChange={changeHandler} placeholder=" " label="Phone No." color="indigo" />
        <TextInput Icon={EnvelopeIcon} type="email" name="email" value={college.email} onChange={changeHandler} placeholder=" " label="College Email" color="indigo" />
        <TextInput Icon={GlobeAltIcon} type="text" name="website" value={college.website} onChange={changeHandler} placeholder=" " label="Website" color="indigo" />
        <TextInput Icon={MapPinIcon} type="text" name="address" value={college.address} onChange={changeHandler} placeholder=" " label="College Address" color="indigo" />

        <button
          onClick={handelRegister}
          className="px-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 mt-6 text-white font-semibold transition shadow-md"
        >
          Register
        </button>

        <button
          className="mt-4 text-indigo-400 hover:underline transition"
          onClick={handelSwitcher}
        >
          Already have an account?
        </button>
      </div>
    </div>
  );
}

export default CollegeRegister;
