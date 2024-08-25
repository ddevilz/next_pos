import React, { useState, useEffect, useRef } from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { useCustomers } from "@/hooks/useCustomers";

interface Customer {
  id: number;
  cname: string;
  mobile: string;
  add1: string;
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
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const { customers, isLoading, isError } = useCustomers(searchTerm);
  const scrollAreaRef = useRef(null);

  const handleCustomerSelect = (customer: Customer) => {
    form.setValue("mobile", customer.mobile);
    form.setValue("cname", customer.cname);
    form.setValue("add1", customer.add1);
    setSearchTerm(customer.mobile);
    setIsDropdownVisible(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        scrollAreaRef.current &&
        !(scrollAreaRef.current as any).contains(event.target)
      ) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [scrollAreaRef]);

  return (
    <>
      <div className="flex gap-1 relative">
        <FormField
          control={form.control}
          name="mobile"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Phone number</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={loading}
                  placeholder="9876541230"
                  type="text"
                  required
                  autoComplete="off"
                  onChange={(e) => {
                    field.onChange(e);
                    setSearchTerm(e.target.value);
                    setIsDropdownVisible(true);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isError && <p>Error loading customers</p>}
        <div className="absolute top-[5rem]" ref={scrollAreaRef}>
          {isDropdownVisible && customers && customers.cus.length > 0 && (
            <ScrollArea className="h-72 w-42 bg-black text-white rounded-md">
              <div className="p-4">
                {customers.cus.map((customer: Customer) => (
                  <>
                    <div
                      key={customer.id}
                      onClick={() => handleCustomerSelect(customer)}
                      style={{ cursor: "pointer" }}
                    >
                      {customer.cname} - {customer.mobile}
                    </div>
                    <Separator className="my-2" />
                  </>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>
        <FormField
          control={form.control}
          name="cname"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={loading}
                  placeholder="Name"
                  type="text"
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name="add1"
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
