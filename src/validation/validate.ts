import { z } from "zod";

export const collegeValidate = z.object({
  name: z.string().min(4).max(50).trim().nonempty(),
  title: z.string().trim().min(10).max(100).nonempty(),
  email: z.string().email().nonempty(),

  phone: z
    .string()
    .regex(/^\d{10}$/, { message: "Phone must be exactly 10 digits" }),

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

  owner_phone: z
    .string()
    .regex(/^\d{10}$/, { message: "Owner phone must be exactly 10 digits" }),

  owner_email: z.string().email().nonempty(),

  owner_name: z.string().min(5).max(50).nonempty()
});
