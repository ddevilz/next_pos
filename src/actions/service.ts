"use server";

import * as z from "zod";
import { ServiceSchema, ServiceSchemaType } from "@/schemas";
import { createService, updateService, getServiceById } from "@/data/service";
import { AuthError } from "next-auth";

// Function to create a service
export const createServiceHandler = async (values: ServiceSchemaType) => {
  const validatedFields = ServiceSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid service data" };
  }

  const { ino, iname, rate1, rate2, rate3, rate4, rate5, itype } =
    validatedFields.data;

  try {
    await createService({
      ino,
      iname,
      rate1,
      rate2,
      rate3,
      rate4,
      rate5,
      itype,
    });
    return { success: "Service created successfully!" };
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Authentication error" };
    }
    return { error: "Something went wrong" };
  }
};

export const modifyServiceHandler = async (
  ino: number,
  values: Partial<ServiceSchemaType>
) => {
  const validatedFields = ServiceSchema.partial().safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid service data" };
  }

  try {
    const existingService = await getServiceById(ino);

    if (!existingService) {
      return { error: "Service not found" };
    }

    await updateService(ino, validatedFields.data);
    return { success: "Service updated successfully!" };
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Authentication error" };
    }
    return { error: "Something went wrong" };
  }
};
