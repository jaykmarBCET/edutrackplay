import React, { useCallback, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useParentStore } from '@/store/Parent.store';
import { ParentInfo } from '../../../types/types';

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
    await createParent(data)
  }, [data, createParent]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
      <div className="w-full mt-10 max-w-lg bg-gray-800 rounded-2xl shadow-xl p-8 space-y-6">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center text-white mb-2">
          Create Parent Account
        </h1>
        <p className="text-center text-gray-400 text-sm mb-4">
          Fill in the details to get started 🚀
        </p>

        {/* Form Fields */}
        <div className="grid gap-4">
          {[
            { label: "Name", value: data.name, key: "name", type: "text" },
            { label: "Email", value: data.email, key: "email", type: "email" },
            { label: "Phone Number", value: data.phone, key: "phone", type: "number" },
            { label: "Address", value: data.address, key: "address", type: "text" },
            { label: "Age", value: data.age, key: "age", type: "number" },
            { label: "Gender", value: data.gender, key: "gender", type: "text" },
            { label: "Password", value: data.password, key: "password", type: "password" }
          ].map((field) => (
            <div key={field.key} className="flex flex-col space-y-1.5">
              <Label htmlFor={field.key} className="text-gray-300 text-sm font-medium">
                {field.label}
              </Label>
              <Input
                id={field.key}
                type={field.type}
                value={field.value}
                onChange={(e) =>
                  setData({
                    ...data,
                    [field.key]: field.type === "number" ? Number(e.target.value) : e.target.value
                  })
                }
                className="rounded-xl border-none bg-gray-700 text-white h-11 px-4
                           focus-visible:ring-2 focus-visible:ring-blue-400 
                           focus-visible:ring-offset-0 placeholder:text-gray-400"
                placeholder={`Enter ${field.label}`}
              />
            </div>
          ))}
        </div>

        {/* Button */}
        <button
          className="w-full h-11 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition"
          onClick={handelRegister}
        >
          {isLoading ? "Creating..." : "Register"}
        </button>

        {/* Switch to Login */}
        <p
          className="text-center text-gray-400 text-sm mt-4"
        >
          Already have an account?{" "}
          <span
            className="text-blue-400 hover:underline cursor-pointer"
            onClick={handelSwitcher}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default ParentRegister;
