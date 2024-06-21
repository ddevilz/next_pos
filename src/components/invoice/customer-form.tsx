import React, { useState } from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { useCustomers } from "@/hooks/useCustomers"; // Adjust the import path accordingly

interface Customer {
  id: number;
  cname: string;
  mobile: string;
  address: string;
}

interface CustomerInfoFormProps {
  form: UseFormReturn;
  loading: boolean;
}

const CustomerInfoForm: React.FC<CustomerInfoFormProps> = ({
  form,
  loading,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { customers, isLoading, isError } = useCustomers(searchTerm);

  const handleCustomerSelect = (customer: Customer) => {
    form.setValue("mobile", customer.mobile);
    form.setValue("cname", customer.cname);
    form.setValue("address", customer.address);
    setSearchTerm(customer.mobile);
  };

  return (
    <>
      <FormField
        control={form.control}
        name="mobile"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Phone number</FormLabel>
            <FormControl>
              <Input
                {...field}
                disabled={loading}
                placeholder="9876541230"
                type="text"
                onChange={(e) => {
                  field.onChange(e);
                  setSearchTerm(e.target.value);
                }}
              />
            </FormControl>
            <FormMessage />
            {isLoading && <p>Loading...</p>}
            {isError && <p>Error loading customers</p>}
            {customers && customers.length > 0 && (
              <div className="customer-list">
                <ul>
                  {customers.map((customer: Customer) => (
                    <li
                      key={customer.id}
                      onClick={() => handleCustomerSelect(customer)}
                      style={{ cursor: "pointer" }}
                    >
                      {customer.cname} - {customer.mobile}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="cname"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input
                {...field}
                disabled={loading}
                placeholder="Name"
                type="text"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="address"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Address</FormLabel>
            <FormControl>
              <Input
                {...field}
                disabled={loading}
                placeholder="Address"
                type="text"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default CustomerInfoForm;
