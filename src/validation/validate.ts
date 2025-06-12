import { z } from "zod";

export const collegeValidate = z.object({
  name: z.string().min(4).max(50).trim().nonempty(),
  title: z.string().trim().min(10).max(100).nonempty(),
  email: z.string().email().nonempty(),

  phone: z.number().min(1000000000).max(100000000000),

  description: z.string().min(30).max(1000),

  logo: z
    .string()
    .url()
    .nonempty()
    .refine((val) => {
      try {
        const host = new URL(val).hostname;
        return host === "cloudinary.com" || host.endsWith(".cloudinary.com");
      } catch {
        return false;
      }
    }, { message: "Logo URL must be hosted on cloudinary.com" }),

  owner_phone: z.number().min(1000000000).max(100000000000),

  owner_email: z.string().email().nonempty(),

  owner_name: z.string().min(5).max(50).nonempty(),
  address:z.string().trim().min(16).max(50),
  field:z.string().trim().min(3).max(30),
  password:z.string().trim().min(6).max(16)

});


export const parentValidate= z.object({
  name:z.string().min(3).max(50).trim().nonempty(),
  address:z.string().min(16).max(72).trim().nonempty(),
  gender:z.string(),
  email:z.string().email(),
  phone:z.number().min(1000000000).max(100000000000),
  age:z.number().min(25).max(85),
  password:z.string().min(6).max(16),

})
export const studentValidate=z.object({
  name:z.string().min(3).max(50).trim().nonempty(),
  address:z.string().min(16).max(72).trim().nonempty(),
  gender:z.string(),
  email:z.string().email(),
  phone:z.number().min(1000000000).max(10000000000),
  age:z.number().min(4).max(22),
  password:z.string().min(6).max(16)
})
