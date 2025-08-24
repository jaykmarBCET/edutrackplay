"use client"

import React, { useCallback, useState } from "react"
import { motion } from "framer-motion"
import { useCollegeStore } from "@/store/College.store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

function CollegeLogin({ handelSwitcher }: { handelSwitcher: () => void }) {
  const [data, setData] = useState<{ email: string; password: string }>({
    password: "",
    email: "",
  })
  const { loginCollege } = useCollegeStore()

  const handelLogin = useCallback(async () => {
    await loginCollege(data)
  }, [loginCollege, data])

  return (
    <motion.div
      className="flex flex-col gap-1 bg-gray-900 justify-center items-center w-screen min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 80 }}
      >
        <Card className="w-96 shadow-xl rounded-2xl border border-gray-700">
          <CardHeader>
            <CardTitle className="text-center text-blue-400">
              College Login
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="relative">
              <Input
                id="email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                type="email"
                placeholder=" "
                className="peer placeholder-transparent"
              />
              <Label
                htmlFor="email"
                className="absolute left-3 top-2 text-gray-400 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm peer-focus:text-blue-400"
              >
                Email
              </Label>
            </div>
            <div className="relative">
              <Input
                id="password"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                type="password"
                placeholder=" "
                className="peer placeholder-transparent"
              />
              <Label
                htmlFor="password"
                className="absolute left-3 top-2 text-gray-400 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm peer-focus:text-blue-400"
              >
                Password
              </Label>
            </div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="w-full" onClick={handelLogin}>
                Login
              </Button>
            </motion.div>
            <motion.p
              className="cursor-pointer text-blue-300 text-right"
              whileHover={{ x: 5, color: "#60a5fa" }}
              transition={{ type: "spring", stiffness: 200 }}
              onClick={handelSwitcher}
            >
              Don’t have an account?
            </motion.p>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

export default CollegeLogin
