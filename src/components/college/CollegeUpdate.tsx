'use client';

import React, { useState } from 'react';
import {
    UserIcon,
    PhoneIcon,
    EnvelopeIcon,
    MapPinIcon,
    AcademicCapIcon,
    GlobeAltIcon,
    PhotoIcon
} from '@heroicons/react/24/outline';
import { CollegeInfo } from '../../../types/types';
import TextInput from '../ui/TextInput';
import Image from 'next/image';
import { useCollegeStore } from '@/store/College.store';



function CollegeUpdate({onCancel}:{onCancel:()=>void}) {
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


    const { updateCollege } = useCollegeStore()






    const handelUpdate = async () => {
        const formData = new FormData()
        formData.append("name", college.name)
        formData.append("title", college.title)
        formData.append("logo", college.logo as File)
        formData.append("address", college.address)
        formData.append("field", college.field)
        formData.append("owner_email", college.owner_email)
        formData.append("owner_name", college.owner_name)
        formData.append("owner_phone", college?.owner_phone as string)
        formData.append("description", college?.description as string)
        formData.append("phone", college.phone)
        formData.append("email", college.email)
        formData.append("website", college.website as string)

        await updateCollege(formData)

    };

    return (
        <div className="flex absolute flex-col items-center bg-[#26262654] right-0 top-0 w-screen min-h-screen text-white px-4 py-8">
            <h1 className="text-3xl font-bold bg-indigo-500 px-6 rounded-xl shadow-md py-3 mt-8">
                College Updates
            </h1>

            <div className="w-full max-w-md border border-gray-700 flex flex-col px-6 py-8 mt-10 rounded-2xl bg-gray-800 mb-8">

                {/* Logo Preview Section */}
                <div className="flex flex-col items-center mb-6">
                    <div className="relative w-24 h-24 rounded-full border-4 border-indigo-500 bg-gray-700 flex items-center justify-center overflow-hidden shadow-inner">
                        {college.logo ? (
                            <Image
                                width={96}
                                height={96}
                                src={URL.createObjectURL(college.logo as File)}
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
                                onChange={(e) => setCollege((prev) => ({ ...prev, logo: e.target.files !== null ? e.target.files[0] : "" }))}
                                className="hidden"
                            />
                        </label>
                    </div>

                </div>

                <TextInput Icon={AcademicCapIcon} type="text" name="name" value={college.name} onChange={(e) => setCollege((prev) => ({ ...prev, name: e.target.value }))} placeholder=" " label="College Name" color="indigo" />
                <TextInput Icon={AcademicCapIcon} type="text" name="title" value={college.title} onChange={(e) => setCollege((prev) => ({ ...prev, title: e.target.value }))} placeholder=" " label="College Title" color="indigo" />
                <TextInput Icon={AcademicCapIcon} type="text" name="field" value={college.field} onChange={(e) => setCollege((prev) => ({ ...prev, field: e.target.value }))} placeholder=" " label="Field" color="indigo" />
                <TextInput Icon={UserIcon} type="text" name="owner_name" value={college.owner_name} onChange={(e) => setCollege((prev) => ({ ...prev, owner_name: e.target.value }))} placeholder=" " label="Owner Name" color="indigo" />
                <TextInput Icon={EnvelopeIcon} type="email" name="owner_email" value={college.owner_email} onChange={(e) => setCollege((prev) => ({ ...prev, owner_email: e.target.value }))} placeholder=" " label="Owner Email" color="indigo" />
                <TextInput Icon={PhoneIcon} type="number" name="phone" value={college.phone || ''} onChange={(e) => setCollege((prev) => ({ ...prev, phone: e.target.value }))} placeholder=" " label="Phone No." color="indigo" />
                <TextInput Icon={EnvelopeIcon} type="email" name="email" value={college.email} onChange={(e) => setCollege((prev) => ({ ...prev, email: e.target.value }))} placeholder=" " label="College Email" color="indigo" />
                <TextInput Icon={GlobeAltIcon} type="text" name="website" value={college.website} onChange={(e) => setCollege((prev) => ({ ...prev, website: e.target.value }))} placeholder=" " label="Website" color="indigo" />
                <TextInput Icon={MapPinIcon} type="text" name="address" value={college.address} onChange={(e) => setCollege((prev) => ({ ...prev, address: e.target.value }))} placeholder=" " label="College Address" color="indigo" />

                <button
                    onClick={handelUpdate}
                    className="px-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 mt-6 text-white font-semibold transition shadow-md"
                >
                    Update
                </button>
                
                <button
                    onClick={onCancel}
                    className="px-8 py-3 rounded-xl bg-red-500 hover:bg-red-700 mt-6 text-white font-semibold transition shadow-md"
                >
                    Cancel
                </button>
                


            </div>
        </div>
    );
}

export default CollegeUpdate;
