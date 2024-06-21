import db from "@/lib/db";
import { ServiceSchemaType } from "@/schemas";

export const createService = async (data: ServiceSchemaType) => {
  console.log("Creating service with data:", data);
  try {
    const serviceObject = await db.service.create({
      data: {
        // ino: data.ino,
        iname: data.iname,
        rate1: data.rate1,
        rate2: data.rate2,
        rate3: data.rate3,
        rate4: data.rate4,
        rate5: data.rate5,
        itype: data.itype,
      },
    });
    console.log("Service created:", serviceObject);
    return serviceObject;
  } catch (error) {
    console.error("Error creating service:", error);
    throw error;
  }
};

export const updateService = async (
  ino: number,
  data: Partial<ServiceSchemaType>
) => {
  return db.service.update({
    where: { ino },
    data,
  });
};

export const getServiceById = async (ino: number) => {
  return db.service.findUnique({
    where: { ino },
  });
};

export const deleteService = async (ino: number) => {
  try {
    const result = await db.service.delete({
      where: { ino },
    });
    return result;
  } catch (error) {
    throw error;
  }
};
