import db from "@/lib/db";
import { CategorySchemaType } from "@/schemas";

export const createCategory = async (data: CategorySchemaType) => {
  return db.category.create({
    data,
  });
};

export const updateCategory = async (
  catid: string,
  data: Partial<CategorySchemaType>
) => {
  return db.category.update({
    where: { catid },
    data,
  });
};

export const getCategoryById = async (catid: string) => {
  return db.category.findUnique({
    where: { catid },
  });
};
