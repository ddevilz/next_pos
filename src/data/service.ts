import db from "@/lib/db";
import { ServiceSchemaType } from "@/schemas";

export const createService = async (data: ServiceSchemaType) => {
  return db.service.create({
    data,
  });
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
