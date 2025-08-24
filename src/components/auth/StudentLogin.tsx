"use client"

import React, { useCallback, useState } from "react"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useStudentStore } from "@/store/Student.store"
import toast from "react-hot-toast"

function StudentLogin({ handelSwitcher }: { handelSwitcher: () => void }) {
  const [data, setData] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  })

  const { loginStudent, isLoading } = useStudentStore()

  const handelLogin = useCallback(async () => {
    if (!data.email.trim() || !data.password.trim()) {
      toast.error("Please fill both fields")
      return
    }
    await loginStudent(data)
  }, [data, loginStudent])

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 px-4">
      <Card className="w-full max-w-md rounded-2xl shadow-lg bg-gray-800 text-white border-none">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-blue-400">Student Login</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="email" className="text-sm text-gray-300">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="password" className="text-sm text-gray-300">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500"
            />
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          <Button
            onClick={handelLogin}
            disabled={isLoading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition"
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>

          <p
            className="text-blue-300 text-sm cursor-pointer hover:underline text-center"
            onClick={handelSwitcher}
          >
            Don’t have an account? Register
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default StudentLogin
