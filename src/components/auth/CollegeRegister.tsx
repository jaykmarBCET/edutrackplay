"use client";

import React, { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { AcademicCapIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { useCollegeStore } from "@/store/College.store";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

// ✅ Validation schema
const collegeSchema = z.object({
  name: z.string().min(2, "College name is required"),
  title: z.string().min(2, "College title is required"),
  field: z.string().min(2, "Field is required"),
  owner_name: z.string().min(2, "Owner name is required"),
  owner_email: z.string().email("Invalid owner email"),
  owner_phone:z.string().min(10).max(12),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().min(10, "Phone number is required"),
  email: z.string().email("Invalid college email"),
  website: z.string().url("Invalid website URL").optional(),
  address: z.string().min(5, "Address is required"),
  description:z.string(),
  logo: z.any().optional(),
});

type CollegeFormValues = z.infer<typeof collegeSchema>;

function CollegeRegister({ handelSwitcher }: { handelSwitcher: () => void }) {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const { createCollege } = useCollegeStore();
  const [loading, setLoading] = useState(false);

  const form = useForm<CollegeFormValues>({
    resolver: zodResolver(collegeSchema),
    defaultValues: {
      name: "",
      title: "",
      field: "",
      owner_name: "",
      owner_email: "",
      owner_phone:"",
      password: "",
      phone: "",
      email: "",
      website: "",
      address: "",
      description:""
    },
  });

  useEffect(() => {
    return () => {
      if (logoPreview) URL.revokeObjectURL(logoPreview);
    };
  }, [logoPreview]);

  const onSubmit = async (values: CollegeFormValues) => {
    try {
      setLoading(true);
      const formData = new FormData();
      Object.entries(values).forEach(([key, val]) => {
        if (val) formData.append(key, val as string);
      });
      if (values.logo instanceof File) {
        formData.append("logo", values.logo);
      }
      await createCollege(formData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full max-w-4xl"
      >
        <Card className="w-full shadow-2xl rounded-2xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white text-center">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, ease: "backOut" }}
            >
              <CardTitle className="text-2xl font-bold">
                🎓 College Registration
              </CardTitle>
            </motion.div>
            <p className="text-sm opacity-80 mt-1">
              Register your college to get started
            </p>
          </CardHeader>

          <CardContent className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Logo Upload */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col items-center space-y-4"
            >
              <div className="relative w-32 h-32 rounded-full border-4 border-indigo-500 bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden shadow-md">
                {logoPreview ? (
                  <Image
                    width={128}
                    height={128}
                    src={logoPreview}
                    alt="Logo Preview"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <AcademicCapIcon className="h-16 w-16 text-gray-400" />
                )}
                <label
                  htmlFor="logo-upload"
                  className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-200 cursor-pointer rounded-full"
                >
                  <PhotoIcon className="h-8 w-8 text-white" />
                  <input
                    type="file"
                    id="logo-upload"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        form.setValue("logo", e.target.files[0]);
                        setLogoPreview(URL.createObjectURL(e.target.files[0]));
                      }
                    }}
                  />
                </label>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {logoPreview ? "Change Logo" : "Upload Logo"}
              </p>


            </motion.div>

            {/* Form Fields */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex flex-col gap-4"
                >
                  {[
                    { name: "name", label: "College Name" },
                    { name: "title", label: "College Title" },
                    { name: "field", label: "Field" },
                    { name: "owner_name", label: "Owner Name" },
                    { name:"owner_phone", label:"Owner Phone"},
                    { name: "owner_email", label: "Owner Email", type: "email" },
                    { name: "password", label: "Password", type: "password" },
                    { name: "phone", label: "Phone No." },
                    { name: "email", label: "College Email", type: "email" },
                    { name: "website", label: "Website" },
                    { name: "address", label: "College Address" },
                    { name: "description", label: "Description"}
                  ].map(({ name, label, type = "text" }) => (
                    <FormField
                      key={name}
                      control={form.control}
                      name={name as keyof CollegeFormValues}
                      render={({ field }) => (
                        <FormItem className="relative">
                          <FormControl>
                            <Input
                            
                              {...field}
                              type={type}
                              placeholder=" "
                              className="peer min-h-14 placeholder-transparent"
                            />
                          </FormControl>
                          <Label
                            htmlFor={name}
                            className="absolute left-3 top-2 text-gray-400 transition-all 
                              peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 
                              peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm 
                              peer-focus:text-indigo-500"
                          >
                            {label}
                          </Label>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}

                  <motion.div whileTap={{ scale: 0.95 }}>
                    <Button
                      type="submit"
                      className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700"
                      disabled={loading}
                    >
                      {loading ? "Registering..." : "Register"}
                    </Button>
                  </motion.div>

                  <Button
                    type="button"
                    variant="link"
                    onClick={handelSwitcher}
                    className="text-indigo-500 hover:underline"
                  >
                    Already have an account?
                  </Button>
                </form>
              </Form>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

export default CollegeRegister;
