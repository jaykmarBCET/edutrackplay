'use client';

import React, { useState, useEffect } from "react";
import { StudentInfo } from "../../../types/types";
import TextInput from "../ui/TextInput";
import { useParentStore } from "@/store/Parent.store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  XMarkIcon,
  UserCircleIcon,
  CameraIcon,
  AcademicCapIcon,
  CheckCircleIcon,
  UserIcon
} from '@heroicons/react/24/outline';

export const AddStudent = ({ onCancel }: { onCancel: () => void }) => {
  const { parent, addChildren, isLoading, getParent } = useParentStore();
  const [preview, setPreview] = useState<string | null>(null);
  const router = useRouter();

  const [data, setData] = useState<StudentInfo>({
    name: "",
    gender: "Male",
    address: "",
    email: "",
    phone: "",
    password: "",
    score: 0,
    isBlocked: false,
    parentId: parent?.id || 0,
    avatar: "",
    coverImage: "",
    cardId: "",
    dob: new Date(),
  });

  // Update parentId when parent?.id becomes available
  useEffect(() => {
    if (parent?.id && data.parentId === 0) {
      setData((prev) => ({ ...prev, parentId: parent.id }));
    }
  }, [parent?.id, data.parentId]);

  // Handle avatar preview
  useEffect(() => {
    if (data.avatar instanceof File) {
      const objectUrl = URL.createObjectURL(data.avatar);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreview(null);
    }
  }, [data.avatar]);

  // Fetch parent details on component mount
  useEffect(() => {
    getParent();
  }, [getParent]);

  // Redirect if parent email is not present (authentication check)
  useEffect(() => {
    if (!parent?.email?.trim()) {
      router.push("/parent/login?id=login");
    }
  }, [parent, router]);

  const handleSubmit = async () => {
    if (
      !data.name.trim() ||
      !data.address.trim() ||
      !(data.avatar instanceof File) ||
      !data.dob ||
      !data.gender ||
      !data.password.trim() ||
      !data.email.trim() ||
      !data.phone?.trim()
    ) {
      toast.error("Please fill all required fields, including uploading an avatar.");
      return;
    }

    const formdata = new FormData();
    formdata.append("name", data.name);
    formdata.append("address", data.address);
    formdata.append("avatar", data.avatar);
    formdata.append("email", data.email);
    formdata.append("password", data.password);
    formdata.append("dob", data.dob.toISOString());
    formdata.append("phone", data.phone?.toString() || "");
    formdata.append("gender", data.gender);
    formdata.append("parentId", data.parentId?.toString() || "");

    try {
      await addChildren(formdata);
      toast.success("Student added successfully!");
      // Reset form data after successful submission
      setData({
        name: "",
        email: "",
        dob: new Date(),
        password: "",
        address: "",
        phone: "",
        gender: "Male",
        avatar: "",
        score: 0,
        isBlocked: false,
        parentId: parent?.id || 0,
        coverImage: "",
        cardId: "",
      });
      onCancel(); // Close modal
    } catch (error) {
      toast.error("Failed to add student. Please try again.");
      console.error("Add Student Error:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-70 p-4">
      <div className="relative w-full max-w-md md:max-w-lg bg-gray-900 text-white rounded-2xl shadow-xl transform transition-all scale-100 opacity-100 duration-300 ease-out animate-fade-in p-8">
        {/* Close Button */}
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200"
          aria-label="Close"
        >
          <XMarkIcon className="h-7 w-7" />
        </button>

        <h2 className="text-3xl font-extrabold text-center text-indigo-400 mb-8 flex items-center justify-center gap-3">
          <AcademicCapIcon className="h-8 w-8" />
          Add New Student
        </h2>

        {/* Avatar Section */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-24 h-24 rounded-full border-4 border-indigo-500 bg-gray-700 flex items-center justify-center overflow-hidden shadow-inner">
            {preview ? (
              <Image
                width={96}
                height={96}
                src={preview}
                alt="Avatar Preview"
                className="object-cover w-full h-full"
              />
            ) : (
              <UserCircleIcon className="h-16 w-16 text-gray-400" />
            )}
            <label
              htmlFor="avatar-upload"
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity duration-200 cursor-pointer rounded-full"
              title="Upload Avatar Image"
            >
              <CameraIcon className="h-8 w-8 text-white" />
              <input
                type="file"
                id="avatar-upload"
                accept="image/*"
                onChange={(e) => setData((prev) => ({ ...prev, avatar: e.target.files?.[0] || "" }))}
                className="hidden"
              />
            </label>
          </div>
          <p className="text-sm text-gray-400 mt-2">{preview ? "Change Avatar" : "Upload Avatar"}</p>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-8">
          <TextInput
            required
            placeholder="Enter Name"
            label="Full Name"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            color="indigo"
          />
          <TextInput
            type="email"
            required
            placeholder="Enter Email"
            label="Email Address"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            color="indigo"
          />
          <TextInput
            required
            placeholder="Enter Password"
            type="password"
            label="Password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            color="indigo"
          />
          <TextInput
            type="tel"
            required
            placeholder="Enter Phone Number"
            label="Phone"
            value={data.phone}
            onChange={(e) => setData({ ...data, phone: e.target.value })}
            color="indigo"
          />
          <TextInput
            required
            placeholder="Enter Address"
            label="Address"
            value={data.address}
            onChange={(e) => setData({ ...data, address: e.target.value })}
            color="indigo"
          />
          <TextInput
            placeholder="Select Date of Birth"
            label="Date of Birth"
            type="date"
            value={data.dob ? data.dob.toISOString().split('T')[0] : ''}
            onChange={(e) => setData((prev) => ({ ...prev, dob: new Date(e.target.value) }))}
            color="indigo"
          />

          {/* Gender Select */}
          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-400 mb-1">
              Gender <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <select
                id="gender"
                value={data.gender}
                onChange={(e) => setData((prev) => ({ ...prev, gender: e.target.value as "Male" | "Female" }))}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md shadow-sm appearance-none cursor-pointer bg-gray-800 text-white"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
                <UserIcon className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            className="px-6 py-3 bg-gray-700 text-white rounded-xl hover:bg-gray-600 transition-colors duration-200 font-medium shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`px-6 py-3 ${isLoading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'} text-white rounded-xl transition-colors duration-200 font-medium shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Adding...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <CheckCircleIcon className="h-5 w-5" /> Add Student
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
