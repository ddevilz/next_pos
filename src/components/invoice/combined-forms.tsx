import React, { useState } from "react";
import { useForm } from "react-hook-form";
import FormHOC from "./form-hoc";
import CustomerInfoForm from "./customer-form";
import { Button } from "@/components/ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import TotalInvoice from "./total-invoice";
import ServicesSelection from "./services-select";
import { saveInvoice } from "@/actions/invoice";
import { InvoiceSchemaType, ServiceSchemaType } from "@/schemas";
import { Toaster, toast } from "sonner";

const CombinedForm: React.FC = () => {
  const form1 = useForm();
  const form2 = useForm();
  const form3 = useForm();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const [addedServices, setAddedServices] = useState<ServiceSchemaType[]>([]);

  const onSubmit = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const data1 = form1.getValues();
      const data2 = form2.getValues();
      const data3 = form3.getValues();

      if (!data1.mobile || !data1.cname) {
        toast.warning("Mobile number and customer name are required.");
        return;
      }
      if (!data3.dueDate) {
        toast.warning("Due date is required.");
        return;
      }

      const combinedData = { ...data1, ...data2, ...data3, addedServices };
      console.log("Combined form data submitted:", combinedData);
      const res = await saveInvoice(combinedData);
      if (res.success) {
        toast.success("Invoice created successfully!");
        form1.reset();
        form2.reset();
        form3.reset();
        setAddedServices([]);
      } else {
        throw Error;
      }
    } catch (err) {
      toast.warning("There was an error submitting the form.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddService = (service: any) => {
    setAddedServices([...addedServices, service]);
  };

  const handleRemoveService = (index: number) => {
    const updatedServices = [...addedServices];
    updatedServices.splice(index, 1);
    setAddedServices(updatedServices);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-4">
      <Toaster richColors position="top-center" />

      {/* Customer Info Form - Spans across all columns */}
      <div className="col-span-1 lg:col-span-4">
        <FormHOC title="Customer Info" form={form1}>
          {(loading) => <CustomerInfoForm form={form1} loading={loading} />}
        </FormHOC>
      </div>

      {/* Services Selection */}
      <div className="col-span-1 lg:col-span-2">
        <FormHOC title="Services Selection" form={form2}>
          {(loading) => (
            <ServicesSelection
              form={form2}
              loading={loading}
              onAddService={handleAddService}
            />
          )}
        </FormHOC>
      </div>

      {/* Total Invoice */}
      <div className="col-span-1 lg:col-span-2">
        <FormHOC title="Total Invoice" form={form3}>
          {(loading) => (
            <TotalInvoice
              form={form3}
              loading={loading}
              addedServices={addedServices}
              removeServices={handleRemoveService}
            />
          )}
        </FormHOC>

        <FormError message={error} />
        <FormSuccess message={success} />

        {/* Submit Button */}
        <Button
          type="button"
          onClick={onSubmit}
          disabled={loading}
          className="w-full mt-4"
        >
          Submit All
        </Button>
      </div>
    </div>
  );
};

export default CombinedForm;
