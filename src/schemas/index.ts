import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password is required" }),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;

export const RegisterSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  email: z.string().email({ message: "Email is required." }),
  password: z.string().min(6, { message: "Minimum 6 characters is required." }),
});

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;

export const CategorySchema = z.object({
  category: z.string().min(1, "Category name is required").max(30),
  catid: z.string().min(1, "Category ID is required").max(10),
});

export type CategorySchemaType = z.infer<typeof CategorySchema>;

export const ServiceSchema = z.object({
  ino: z.number().int(),
  iname: z
    .string()
    .min(1, "Service name is required")
    .max(75, "Service name must be at most 75 characters"),
  rate1: z.number(),
  rate2: z.number(),
  rate3: z.number(),
  rate4: z.number(),
  rate5: z.number(),
  itype: z
    .string()
    .min(1, "Service type is required")
    .max(30, "Service type must be at most 30 characters"),
});

export type ServiceSchemaType = z.infer<typeof ServiceSchema>;
