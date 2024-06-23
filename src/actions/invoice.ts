"use server";

import db from "@/lib/db";
import { InvoiceSchema, InvoiceSchemaType } from "@/schemas";

export const saveInvoice = async (invoiceData: unknown) => {
  const parsedInvoice = InvoiceSchema.parse(invoiceData);

  const {
    add1,
    addedServices,
    advancePaid,
    cname,
    discountAmount,
    dueDate,
    gst,
    mobile,
    remainingAmount,
    totalAfterDiscount,
    totalAfterGST,
    totalAmount,
  } = parsedInvoice;

  try {
    const customer = await db.customer.findUnique({
      where: {
        mobile,
      },
    });

    if (!customer) {
      const newCustomer = await db.customer.create({
        data: {
          cname,
          mobile,
          add1,
        },
      });
      console.log(newCustomer);
    }

    const invoice = await db.invoice.create({
      data: {
        add1,
        advancePaid,
        cname,
        discountAmount,
        dueDate,
        gst,
        mobile,
        remainingAmount,
        totalAfterDiscount,
        totalAfterGST,
        totalAmount,
        services: {
          create: addedServices.map((service) => ({
            ino: service.ino,
            iname: service.iname,
            quantity: service.quantity,
            notes: service.notes,
            rate: service.rate || service.rate1,
          })),
        },
      },
    });

    return { success: 200, message: "Invoice created successfully", invoice };
  } catch (error) {
    console.error("Error saving invoice:", error);
    throw new Error("Internal server error");
  }
};
