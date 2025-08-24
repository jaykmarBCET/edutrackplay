import React, { useCallback, useEffect, useState } from 'react'
import { useParentStore } from '@/store/Parent.store'
import { useRouter } from 'next/navigation'
import { BounceLoader } from 'react-spinners'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

function ParentLogin({ handelSwitcher }: { handelSwitcher: () => void }) {
  const [data, setData] = useState<{ email: string; password: string }>({
    email: '',
    password: ''
  })

  const { loginParent, getParent, parent, isLoading } = useParentStore()
  const router = useRouter()

  const handelLogin = useCallback(async () => {
    await loginParent(data)
  }, [data, loginParent])

  useEffect(() => {
    getParent()
  }, [getParent])

  useEffect(() => {
    if (parent?.email?.trim()) {
      router.push("/parent")
    }
  }, [parent, router])

  return (
    <div className="flex justify-center items-center w-screen min-h-screen bg-gray-900">
      <Card className="w-[400px] shadow-2xl bg-gray-800 text-white">
        <CardHeader>
          <CardTitle className="text-center text-xl text-blue-400">Parent Login</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              placeholder="Enter Email"
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              placeholder="Enter Password"
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>

          <Button
            className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-2xl"
            onClick={handelLogin}
            disabled={isLoading}
          >
            {isLoading ? <BounceLoader size={25} color="#fff" /> : "Login"}
          </Button>

          <p
            className="cursor-pointer text-blue-300 text-right hover:underline"
            onClick={handelSwitcher}
          >
            Don’t have an account?
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default ParentLogin
