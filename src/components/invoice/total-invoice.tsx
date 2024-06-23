import React, { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormField } from "../ui/form";
import { ScrollArea } from "../ui/scroll-area";
import { ServiceSchemaType } from "@/schemas";

interface TotalInvoiceProps {
  form: UseFormReturn;
  loading: boolean;
  addedServices: ServiceSchemaType[];
  removeServices: any;
}

const TotalInvoice: React.FC<TotalInvoiceProps> = ({
  form,
  loading,
  addedServices,
  removeServices,
}) => {
  const calculateTotalAmountForForm = () => {
    const totalAmount = addedServices.reduce(
      (total: number, service: any) =>
        total + parseFloat(service.rate) * parseFloat(service.quantity),
      0
    );
    form.setValue("totalAmount", totalAmount.toFixed(2));
  };

  useEffect(() => {
    calculateTotalAmountForForm();
  }, [addedServices]);

  const calculateTotalAmount = () => {
    const discountAmount = parseFloat(form.getValues("discountAmount") || "0");
    const gst = parseFloat(form.getValues("gst") || "0");
    const advancePaid = parseFloat(form.getValues("advancePaid") || "0");
    const totalAmount = parseFloat(form.getValues("totalAmount") || "0");

    const totalAfterDiscount = totalAmount - discountAmount;
    const totalAfterGST = totalAfterDiscount * (1 + gst / 100);
    const remainingAmount = totalAfterGST - advancePaid;

    form.setValue("totalAfterDiscount", totalAfterDiscount.toFixed(2));
    form.setValue("totalAfterGST", totalAfterGST.toFixed(2));
    form.setValue("remainingAmount", remainingAmount.toFixed(2));
  };

  useEffect(() => {
    calculateTotalAmount();
  }, [
    addedServices,
    form.watch("discountAmount"),
    form.watch("gst"),
    form.watch("advancePaid"),
  ]);

  const totalAmount = addedServices.reduce(
    (total: number, service: any) =>
      total + parseFloat(service.rate) * parseFloat(service.quantity),
    0
  );

  const renderServicesTable = () => {
    const services = addedServices;
    return (
      <ScrollArea className="h-72">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Service Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rate
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Notes
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {services.map((service: any, index: number) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{service.iname}</td>
                <td className="px-6 py-4 whitespace-nowrap">{service.rate}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {service.quantity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{service.notes}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Button
                    onClick={() => removeServices(index)}
                    disabled={loading}
                  >
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
            <tr className="bg-gray-100">
              <td colSpan={2} className="px-6 py-4 text-right">
                <strong>Total Amount:</strong>
              </td>
              <td colSpan={3} className="px-6 py-4 whitespace-nowrap">
                {totalAmount}
              </td>
            </tr>
          </tbody>
        </table>
      </ScrollArea>
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Invoice Details</h1>
      <form className="space-y-4">
        {renderServicesTable()}
        <div className="grid grid-cols-1 gap-y-4 gap-x-8 sm:grid-cols-2 md:grid-cols-3">
          <div className="flex gap-1">
            <FormField
              control={form.control}
              name="totalAmount"
              render={({ field }) => (
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    Total Amount
                  </label>
                  <Input
                    {...field}
                    disabled={loading}
                    type="number"
                    placeholder="Total Amount"
                  />
                </div>
              )}
            />
          </div>
          <div className="flex gap-1">
            <FormField
              control={form.control}
              name="discountAmount"
              render={({ field }) => (
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    Discount
                  </label>
                  <Input
                    {...field}
                    disabled={loading}
                    type="number"
                    placeholder="Discount Amount"
                  />
                </div>
              )}
            />
          </div>
          <div className="flex gap-1">
            <FormField
              control={form.control}
              name="gst"
              render={({ field }) => (
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    GST (%)
                  </label>
                  <Input
                    {...field}
                    disabled={loading}
                    type="number"
                    placeholder="GST Amount"
                  />
                </div>
              )}
            />
          </div>
          <div className="flex gap-1">
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    Due Date
                  </label>
                  <Input
                    {...field}
                    disabled={loading}
                    type="date"
                    placeholder="Due Date"
                    required
                  />
                </div>
              )}
            />
          </div>
          <div className="flex gap-1">
            <FormField
              control={form.control}
              name="advancePaid"
              render={({ field }) => (
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    Advance Paid
                  </label>
                  <Input
                    {...field}
                    disabled={loading}
                    type="number"
                    placeholder="Advance Paid"
                  />
                </div>
              )}
            />
          </div>
          <div className="flex gap-1">
            <FormField
              control={form.control}
              name="totalAfterDiscount"
              render={({ field }) => (
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    Total After Discount
                  </label>
                  <Input
                    {...field}
                    disabled
                    type="number"
                    placeholder="Total After Discount"
                  />
                </div>
              )}
            />
          </div>
          <div className="flex gap-1">
            <FormField
              control={form.control}
              name="totalAfterGST"
              render={({ field }) => (
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    Total After GST
                  </label>
                  <Input
                    {...field}
                    disabled
                    type="number"
                    placeholder="Total After GST"
                  />
                </div>
              )}
            />
          </div>
          <div className="flex gap-1">
            <FormField
              control={form.control}
              name="remainingAmount"
              render={({ field }) => (
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    Remaining Amount
                  </label>
                  <Input
                    {...field}
                    disabled
                    type="number"
                    placeholder="Remaining Amount"
                  />
                </div>
              )}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default TotalInvoice;
