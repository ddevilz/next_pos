import db from "@/lib/db";
import { CategorySchemaType } from "@/schemas";

export const createCategory = async (data: CategorySchemaType) => {
  console.log(data);
  await db.category.create({
    data: {
      catid: data.catid,
      category: data.category,
    },
  });
  return true;
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

export const deleteCategory = async (catid: string) => {
  return db.category.delete({
    where: { catid },
  });
};
