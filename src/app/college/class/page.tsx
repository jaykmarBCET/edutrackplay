"use client"
import React, { useEffect } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { useCollegeClassPriceStore, useCollegeStore } from "@/store/College.store"
import { CollegeClassPricingInfo } from "../../../../types/types"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

function CollegeClassPage() {
  const { college, getCollege } = useCollegeStore()
  const {
    allClassPricing,
    createClassPrice,
    updateClassPrice,
    deleteClassPrice,
    getClassPrice,
  } = useCollegeClassPriceStore()

  const { register, handleSubmit, reset, setValue, watch } =
    useForm<CollegeClassPricingInfo>({
      defaultValues: { price: 0, stander: 1, duration: 12 },
    })

  useEffect(() => {
    getCollege()
    getClassPrice()
  }, [])

  const onSubmit = async (data: CollegeClassPricingInfo) => {
    if (!college) return
    const payload = { ...data, collegeId: college.id }

    if (data.id) {
      await updateClassPrice(payload)
    } else {
      await createClassPrice(payload)
    }
    reset({ price: 0, stander: 1, duration: 12 })
  }

  const handleEdit = (item: CollegeClassPricingInfo) => {
    setValue("id", item.id)
    setValue("price", item.price)
    setValue("stander", item.stander)
    setValue("duration", item.duration)
  }

  const handleDelete = async (id?: number) => {
    if (id){
       await deleteClassPrice(id)
      }
  }

  const isEditing = !!watch("id")

  return (
    <div className="p-8 space-y-6 bg-gray-900">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold  italic text-white"
      >
       Class Pricing  Dashboard
      </motion.h1>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="shadow-xl rounded-2xl">
          <CardHeader>
            <CardTitle className="font-[var(--font-cascadia-mono)] italic">{isEditing ? "Update Class Price" : "Add Class Price"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <Input
                type="number"

                placeholder="Price"
                {...register("price", { required: true, valueAsNumber: true })}
              />
              <Input
                type="number"
                placeholder="Standard"
                {...register("stander", { required: true, valueAsNumber: true })}
              />
              <Input
                type="number"
                placeholder="Duration (Week)"
                {...register("duration", { required: true, valueAsNumber: true })}
              />

              <div className="col-span-1 md:col-span-3 flex gap-3 justify-end">
                <Button type="submit" className="rounded-2xl">
                  {isEditing ? "Update" : "Add"}
                </Button>
                {isEditing && (
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => reset({ price: 0, stander: 1, duration: 12 })}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="shadow-xl rounded-2xl">
          <CardHeader>
            <CardTitle>Class Price List</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Standard</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allClassPricing.length > 0 ? (
                  allClassPricing.map((item,idx) => (
                    <motion.tr
                      key={idx}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="border-b"
                    >
                      <TableCell>{item.id}</TableCell>
                      <TableCell>₹{item.price}</TableCell>
                      <TableCell>{item.stander}</TableCell>
                      <TableCell>{item.duration} Weeks</TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(item)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(item.id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </motion.tr>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-gray-500">
                      No class prices available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default CollegeClassPage
