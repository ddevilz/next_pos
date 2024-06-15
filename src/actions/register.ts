"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { RegisterSchemaType, RegisterSchema } from "@/schemas";
import db from "@/lib/db";
import { getUserByEmail } from "@/data/user";

export const register = async (values: RegisterSchemaType) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid values" };
  }

  const { email, password, name } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "email already exists!" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return { success: "Login successful!" };
};
