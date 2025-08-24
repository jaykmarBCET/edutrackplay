import React, { useState } from "react";
import { StudentInfo } from "../../../types/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useStudentStore } from "@/store/Student.store";

function StudentRegister({ handelSwitcher }: { handelSwitcher: () => void }) {
  const [student, setStudent] = useState<StudentInfo>({
    name: "",
    gender: "Male",
    address: "",
    email: "",
    phone: "",
    password: "",
    avatar: "",
    dob: new Date(),
  });
  const {createStudent} = useStudentStore()

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, files } = e.target;


    if (type === "file" && files && files[0]) {
      const file = files[0];
      if (file.size < 1024 * 1024) {
        const imageUrl = URL.createObjectURL(file);
        setStudent((prev) => ({ ...prev, avatar: imageUrl }));
      } else {
        alert("Avatar size must be less than 1MB");
      }
    } else if (name === "dob") {
      setStudent((prev) => ({ ...prev, dob: new Date(value) }));
    } else {
      setStudent((prev) => ({
        ...prev,
        [name]: type === "number" ? +value : value,
      }));
    }
  };

  const handleRegister = async() => {
    console.log(student);
     await createStudent(student)
  };

  return (
    <div className="flex items-center justify-center w-screen min-h-screen bg-gray-700 text-white">
      <Card className="w-full max-w-md bg-gray-800 border-none shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl text-blue-400">
            Student Register
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {/* Name */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Enter Name"
              onChange={changeHandler}
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter Email"
              onChange={changeHandler}
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter Password"
              onChange={changeHandler}
            />
          </div>

          {/* Address */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              name="address"
              type="text"
              placeholder="Enter Address"
              onChange={changeHandler}
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              type="number"
              placeholder="Enter Phone"
              onChange={changeHandler}
            />
          </div>

          {/* Date of Birth */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="dob">Date of Birth</Label>
            <Input id="dob" name="dob" type="date" onChange={changeHandler} />
          </div>

          {/* Avatar Upload */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="avatar">Upload Avatar</Label>
            <Input
              id="avatar"
              name="avatar"
              type="file"
              accept="image/png, image/jpeg, image/webp"
              onChange={changeHandler}
            />
          </div>

          {/* Buttons */}
          <Button onClick={handleRegister} className="w-full bg-blue-500">
            Register
          </Button>
          <Button
            variant="ghost"
            onClick={handelSwitcher}
            className="text-blue-300 hover:underline"
          >
            I have an account
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default StudentRegister;
