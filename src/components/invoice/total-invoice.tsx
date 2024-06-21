import React from "react";
import { UseFormReturn } from "react-hook-form";

interface TotalInvoiceProps {
  form: UseFormReturn;
  loading: boolean;
}

const TotalInvoice: React.FC<TotalInvoiceProps> = ({ form, loading }) => {
  return <div>TotalInvoice</div>;
};

export default TotalInvoice;
