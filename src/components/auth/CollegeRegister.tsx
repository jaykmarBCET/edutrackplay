import React, { useState } from 'react';
import { CollegeInfo } from '../../../types/types';
import TextInput from '../ui/TextInput';

function CollegeRegister({ handelSwitcher }: { handelSwitcher: () => void }) {
  const [college, setCollege] = useState<CollegeInfo>({
    title: "",
    name: "",
    address: "",
    field: "",
    owner_name: "",
    owner_email: "",
    password: "",
    logo: "",
    phone: 0,
    email: "",
    website: ""
  });

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, files } = e.target;

    if (type === 'file' && files && files[0]) {
      const file = files[0];

      if (file.size < 1024 * 1024) {
        // TODO: Upload to Cloudinary here
        const url = URL.createObjectURL(file); // temporary preview or placeholder
        setCollege({ ...college, [name]: url });
      } else {
        alert("File size must be less than 1MB");
      }

    } else {
      setCollege({ ...college, [name]: type === 'number' ? +value : value });
    }
  };

  const handelRegister = () => {
    console.log(college);
    // TODO: Submit form logic
  };

  return (
    <div className="flex flex-col items-center bg-gray-700 w-screen min-h-screen text-white px-4">
      <h1 className="text-2xl font-bold bg-blue-500 px-6 rounded-xl shadow-md py-2 mt-8">
        College Register
      </h1>

      <div className="w-full max-w-md border border-gray-500 flex flex-col px-6 py-4 mt-10 rounded-xl bg-gray-800 mb-8">
        <TextInput type="text" name="name" onChange={changeHandler} placeholder="Enter name" label="Name" />
        <TextInput type="email" name="email" onChange={changeHandler} placeholder="Enter College Email" label="College Email" />
        <TextInput type="text" name="title" onChange={changeHandler} placeholder="Enter College Title" label="Title" />
        <TextInput type="text" name="field" onChange={changeHandler} placeholder="Enter Field" label="Field" />
        <TextInput type="password" name="password" onChange={changeHandler} placeholder="Enter Password" label="Password" />
        <TextInput type="number" name="phone" onChange={changeHandler} placeholder="Enter Number" label="Phone No." />
        <TextInput type="text" name="owner_name" onChange={changeHandler} placeholder="Enter Owner Name" label="Owner Name" />
        <TextInput type="email" name="owner_email" onChange={changeHandler} placeholder="Enter Owner Email" label="Owner Email" />
        <TextInput type="text" name="address" onChange={changeHandler} placeholder="Enter College Address" label="College Address" />
        <TextInput type="file" accept="image/png, image/jpeg, image/webp" name="logo" onChange={changeHandler} label="Upload Logo" />

        <button
          onClick={handelRegister}
          className="px-8 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 mt-6 text-white font-semibold transition"
        >
          Register
        </button>

        <button className="mt-3 text-blue-300 hover:underline" onClick={handelSwitcher}>
          I have an account
        </button>
      </div>
    </div>
  );
}

export default CollegeRegister;
