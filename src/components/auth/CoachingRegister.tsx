import React, { useState } from 'react';
import { CoachingInfo } from '../../../types/types';
import TextInput from '../ui/TextInput';

function CoachingRegister({ handelSwitcher }: { handelSwitcher: () => void }) {
  const [coaching, setCoaching] = useState<CoachingInfo>({
    address: '',
    field: '',
    title: '',
    name: '',
    owner_name: '',
    owner_email: '',
    owner_phone: 0,
    password: '',
    logo: '',
    phone: 0,
    email: ''
  });

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, files } = e.target;
    if (type === 'file' && files && files[0]) {
      const file = files[0]
      if(file.size<1024*1024){
        // upload in cloudinary
        const url = "url"
        setCoaching({...coaching, logo:url})
      }else{
        alert("File size must be less then 1MB")
      }
      setCoaching({ ...coaching, [name]: URL.createObjectURL(file) });
    } else {
      setCoaching({ ...coaching, [name]: type === 'number' ? +value : value });
    }
  };


  const handelRegister = ()=>{

  }

  return (
    <div className="flex flex-col items-center bg-gray-700 w-screen min-h-screen text-white px-4">
      <h1 className="text-2xl font-bold bg-blue-500 px-6 rounded-xl shadow-md py-2 mt-8">
        Coaching Register
      </h1>

      <div className="w-full max-w-md border border-gray-500 flex flex-col px-6 py-4 mt-10 rounded-xl bg-gray-800 mb-8">
        <TextInput type="text" name="name" onChange={changeHandler} placeholder="Enter name" label="Name" />
        <TextInput type="email" name="email" onChange={changeHandler} placeholder="Enter Coaching Email" label="Coaching Email" />
        <TextInput type="text" name="title" onChange={changeHandler} placeholder="Enter Coaching Title" label="Title" />
        <TextInput type="text" name="field" onChange={changeHandler} placeholder="Enter Field" label="Field" />
        <TextInput type="password" name="password" onChange={changeHandler} placeholder="Enter Password" label="Password" />
        <TextInput type="number" name="phone" onChange={changeHandler} placeholder="Enter Number" label="Phone No." />
        <TextInput type="text" name="owner_name" onChange={changeHandler} placeholder="Enter Owner Name" label="Owner Name" />
        <TextInput type="email" name="owner_email" onChange={changeHandler} placeholder="Enter Owner Email" label="Owner Email" />
        <TextInput type="text" name="address" onChange={changeHandler} placeholder="Enter Coaching Address" label="Coaching Address" />
        <TextInput type="file" accept="image/png, image/jpeg, image/webp" name="logo" onChange={changeHandler} label="Upload Logo" />

        <button className="px-8 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 mt-6 text-white font-semibold transition">
          Register
        </button>
        <button className='mt-3' onClick={handelSwitcher}>I have account</button>
      </div>
    </div>
  );
}

export default CoachingRegister;
