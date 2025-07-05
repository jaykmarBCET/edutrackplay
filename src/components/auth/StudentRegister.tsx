import React, { useState } from 'react';
import { StudentInfo } from '../../../types/types';
import TextInput from '../ui/TextInput';

function StudentRegister({ handelSwitcher }: { handelSwitcher: () => void }) {
  const [student, setStudent] = useState<StudentInfo>({
    name: '',
    gender: 'Male',
    address: '',
    email: '',
    phone: 0,
    password: '',
    avatar: '',
    dob: new Date(),
  });

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, files } = e.target;

    if (type === 'file' && files && files[0]) {
      const file = files[0];
      if (file.size < 1024 * 1024) {
        const imageUrl = URL.createObjectURL(file);
        setStudent(prev => ({ ...prev, avatar: imageUrl }));
      } else {
        alert('Avatar size must be less than 1MB');
      }
    } else if (name === 'dob') {
      setStudent(prev => ({ ...prev, dob: new Date(value) }));
    } else {
      setStudent(prev => ({
        ...prev,
        [name]: type === 'number' ? +value : value,
      }));
    }
  };

  const handleRegister = () => {
    console.log(student);
    // TODO: Validate and submit to backend
  };

  return (
    <div className="flex flex-col items-center bg-gray-700 w-screen min-h-screen text-white px-4">
      <h1 className="text-2xl font-bold bg-blue-500 px-6 py-2 rounded-xl shadow mt-8">
        Student Register
      </h1>

      <div className="w-full max-w-md border border-gray-500 flex flex-col px-6 py-4 mt-10 rounded-xl bg-gray-800 mb-8">
        <TextInput type="text" name="name" onChange={changeHandler} placeholder="Enter Name" label="Name" />
        <TextInput type="email" name="email" onChange={changeHandler} placeholder="Enter Email" label="Email" />
        <TextInput type="password" name="password" onChange={changeHandler} placeholder="Enter Password" label="Password" />
        <TextInput type="text" name="address" onChange={changeHandler} placeholder="Enter Address" label="Address" />
        <TextInput type="number" name="phone" onChange={changeHandler} placeholder="Enter Phone" label="Phone" />
        <TextInput type="date" name="dob" onChange={changeHandler} label="Date of Birth" />

        <TextInput
          type="file"
          name="avatar"
          accept="image/png, image/jpeg, image/webp"
          onChange={changeHandler}
          label="Upload Avatar"
        />

        <button
          onClick={handleRegister}
          className="px-8 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 mt-6 text-white font-semibold"
        >
          Register
        </button>

        <button
          onClick={handelSwitcher}
          className="mt-3 text-blue-300 hover:underline"
        >
          I have an account
        </button>
      </div>
    </div>
  );
}

export default StudentRegister;
