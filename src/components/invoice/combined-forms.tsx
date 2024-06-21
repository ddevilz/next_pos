import React from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import FormHOC from "./form-hoc";
import CustomerInfoForm from "./customer-form";
import { Button } from "@/components/ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import TotalInvoice from "./total-invoice";
import ServicesSelection from "./services-select";

const CombinedForm: React.FC = () => {
  const form1 = useForm();
  const form2 = useForm();
  const form3 = useForm();

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | undefined>("");
  const [success, setSuccess] = React.useState<string | undefined>("");

  const onSubmit = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const data1 = form1.getValues();
      const data2 = form2.getValues();
      const data3 = form3.getValues();

      const combinedData = { ...data1, ...data2, ...data3 };
      console.log("Combined form data submitted:", combinedData);

      // Submit combinedData to your API or process it as needed
      setSuccess("Form submitted successfully!");
    } catch (err) {
      setError("There was an error submitting the form.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <FormHOC title="Customer Info" form={form1}>
        {(loading) => <CustomerInfoForm form={form1} loading={loading} />}
      </FormHOC>
      <FormHOC form={form2}>
        {(loading) => <ServicesSelection form={form2} loading={loading} />}
      </FormHOC>
      <div className="w-full mt-4">
        <FormHOC title="More Info" form={form3}>
          {(loading) => <TotalInvoice form={form2} loading={loading} />}
        </FormHOC>
        <FormError message={error} />
        <FormSuccess message={success} />
        <Button
          type="button"
          onClick={onSubmit}
          disabled={loading}
          className="w-full"
        >
          Submit All
        </Button>
      </div>
    </>
  );
};

export default CombinedForm;
