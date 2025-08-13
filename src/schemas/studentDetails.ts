import { z } from "zod";

export const statusSchema = z.object({
  status: z.enum(["active", "completed"]),
});

export const addressSchema = z.object({
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State is required" }),
  pin: z.string().min(1, { message: "PIN is required" }),
});

export const studentDetailsSchema = z.object({
  id: z.union([z.string(), z.number()]),
  name: z.string().min(1, { message: "Name is required" }),
  discipline: z.string().min(1, { message: "Discipline is required" }),
  phone: z.string().min(1, { message: "Phone is required" }),
  address: addressSchema,
  email: z.string().email({ message: "Invalid email address" }),
  createdAT: z.string().optional(),
  status: statusSchema,
  joiningDate: z.string().optional(), // match your Student type
   img: z.string().optional(),
});

export type StudentDetails = z.infer<typeof studentDetailsSchema>;
