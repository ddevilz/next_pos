"use server";

import * as z from "zod";
import { CategorySchema, CategorySchemaType } from "@/schemas";
import {
  createCategory,
  updateCategory,
  getCategoryById,
  deleteCategory,
} from "@/data/category";
import { AuthError } from "next-auth";

export const createCategoryHandler = async (values: CategorySchemaType) => {
  const validatedFields = CategorySchema.safeParse(values);
  console.log(values);

  if (!validatedFields.success) {
    return { error: "Invalid category data" };
  }
  const { category, catid } = validatedFields.data;
  try {
    const res = await createCategory({ category, catid });
    if (!res) {
      console.log("hey");
    }
    console.log("hello");
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
export const deleteCategoryHandler = async (catid: string) => {
  try {
    const existingCategory = await getCategoryById(catid);

    if (!existingCategory) {
      return { error: "Category not found" };
    }

    await deleteCategory(catid);
    return { success: "Category deleted successfully!" };
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Authentication error" };
    }
    return { error: "Something went wrong" };
  }
};
