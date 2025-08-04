import React, { useCallback, useState } from 'react';
import TextInput from '../ui/TextInput';
import { ParentInfo } from '../../../types/types';
import { useParentStore } from '@/store/Parent.store';

function ParentRegister({ handelSwitcher }: { handelSwitcher: () => void }) {
  const [data, setData] = useState<ParentInfo>({
    name: '',
    email: '',
    phone: "",
    password: '',
    age: 0,
    address: '',
    gender: "Male"
  });
  const { createParent, isLoading } = useParentStore()

  const handelRegister = useCallback(async () => {
    console.log(data);
    await createParent(data)
  }, [data,createParent]);

  return (
    <div className="flex flex-col gap-4 bg-gray-700 justify-center items-center w-screen min-h-screen text-white px-4">
      <h1 className="text-2xl font-bold bg-blue-500 px-6 py-2 rounded-xl shadow mt-8">
        Parent Register
      </h1>

      <div className="flex flex-col w-full max-w-md px-4 py-6 bg-gray-800 rounded-2xl shadow-lg gap-4">
        <TextInput
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          label="Name"
          type="text"
          placeholder="Enter Name"
          color="blue"
        />
        <TextInput
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          label="Email"
          type="email"
          placeholder="Enter Email"
          color="blue"
        />
        <TextInput
          value={data.address}
          onChange={(e) => setData({ ...data, address: e.target.value })}
          label="Address"
          type="text"
          placeholder="Enter Address"
          color="blue"
        />
        <TextInput
          value={data.age}
          onChange={(e) => setData({ ...data, age: Number(e.target.value) })}
          label="Age"
          type="number"
          placeholder="Enter Age"
          color="blue"
        />
        <TextInput
          value={data.phone}
          onChange={(e) => setData({ ...data, phone: e.target.value })}
          label="Phone Number"
          type="number"
          placeholder="Enter Phone Number"
          color="blue"
        />
        <TextInput
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          label="Password"
          type="password"
          placeholder="Enter Password"
          color="blue"
        />
        <TextInput
          label='Gender'
          placeholder='Enter Gender'
          value={data.gender}
          onChange={(e) => setData({ ...data, gender: e.target.value })}
        />

        <button
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-2xl transition"
          onClick={handelRegister}
        >
          {isLoading ? "Creating" : "Register"}
        </button>

        <p
          className="text-blue-300 hover:underline text-right cursor-pointer"
          onClick={handelSwitcher}
        >
          Already have an account?
        </p>
      </div>
    </div>
  );
}

export default ParentRegister;
