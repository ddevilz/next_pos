"use server";

import * as z from "zod";
import { CategorySchema, CategorySchemaType } from "@/schemas";
import {
  createCategory,
  updateCategory,
  getCategoryById,
} from "@/data/category";
import { AuthError } from "next-auth";

export const createCategoryHandler = async (values: CategorySchemaType) => {
  const validatedFields = CategorySchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid category data" };
  }

  const { category, catid } = validatedFields.data;

  try {
    await createCategory({ category, catid });
    return { success: "Category created successfully!" };
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Authentication error" };
    }
    return { error: "Something went wrong" };
  }
};

export const modifyCategoryHandler = async (
  catid: string,
  values: Partial<CategorySchemaType>
) => {
  const validatedFields = CategorySchema.partial().safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid category data" };
  }

  try {
    const existingCategory = await getCategoryById(catid);

    if (!existingCategory) {
      return { error: "Category not found" };
    }

    await updateCategory(catid, validatedFields.data);
    return { success: "Category updated successfully!" };
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Authentication error" };
    }
    return { error: "Something went wrong" };
  }
};
