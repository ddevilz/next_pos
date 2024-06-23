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
  ino: z.coerce.number().int().optional(),
  iname: z
    .string()
    .min(1, "Service name is required")
    .max(75, "Service name must be at most 75 characters"),
  rate: z.number().min(0).optional(),
  rate1: z.coerce.number(),
  rate2: z.coerce.number(),
  rate3: z.coerce.number(),
  rate4: z.coerce.number(),
  rate5: z.coerce.number(),
  itype: z
    .string()
    .min(1, "Service type is required")
    .max(30, "Service type must be at most 30 characters"),
  quantity: z.number().min(1).optional(),
  notes: z.string().optional(),
});

export type ServiceSchemaType = z.infer<typeof ServiceSchema>;

export const InvoiceSchema = z.object({
  cname: z.string(),
  mobile: z.string(),
  add1: z.string(),
  addedServices: z.array(ServiceSchema),
  advancePaid: z.string().transform((str) => parseFloat(str)),
  discountAmount: z.string().transform((str) => parseFloat(str)),
  dueDate: z
    .string()
    .optional()
    .nullable()
    .transform((str) => (str ? new Date(str) : null)),
  gst: z.string().transform((str) => parseFloat(str)),
  totalAmount: z.string().transform((str) => parseFloat(str)),
  remainingAmount: z.string().transform((str) => parseFloat(str)),
  totalAfterDiscount: z.string().transform((str) => parseFloat(str)),
  totalAfterGST: z.string().transform((str) => parseFloat(str)),
});
export type InvoiceSchemaType = z.infer<typeof InvoiceSchema>;
