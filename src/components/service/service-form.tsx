"use client";

import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ServiceSchema, ServiceSchemaType } from "@/schemas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import {
  createServiceHandler,
  modifyServiceHandler,
  deleteServiceHandler,
} from "@/actions/service";
import { log } from "console";

type ServiceFormProps = {
  onAddService: (service: ServiceSchemaType) => void;
  onUpdateService: (service: ServiceSchemaType) => void;
  onDeleteService: (ino: number) => void;
  editingService: ServiceSchemaType | null;
  categories: string[];
};

export const ServiceForm: React.FC<ServiceFormProps> = ({
  onAddService,
  onUpdateService,
  onDeleteService,
  editingService,
  categories,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const successTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const form = useForm<ServiceSchemaType>({
    resolver: zodResolver(ServiceSchema),
    defaultValues: {
      ino: 0,
      iname: "",
      rate1: 0,
      rate2: 0,
      rate3: 0,
      rate4: 0,
      rate5: 0,
      itype: "",
    },
  });

  useEffect(() => {
    if (editingService) {
      form.setValue("ino", editingService.ino);
      form.setValue("iname", editingService.iname);
      form.setValue("rate1", editingService.rate1);
      form.setValue("rate2", editingService.rate2);
      form.setValue("rate3", editingService.rate3);
      form.setValue("rate4", editingService.rate4);
      form.setValue("rate5", editingService.rate5);
      form.setValue("itype", editingService.itype);
    } else {
      form.reset();
    }
  }, [editingService, form]);

  useEffect(() => {
    return () => {
      if (successTimeoutRef.current) {
        clearTimeout(successTimeoutRef.current);
      }
    };
  }, []);

  const onSubmit = async (values: ServiceSchemaType) => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (editingService) {
        if (!values.ino) {
          throw error;
        }
        await modifyServiceHandler(values.ino, values);
        onUpdateService(values);
        setSuccess("Service updated successfully!");
      } else {
        await createServiceHandler(values);
        console.log("hello");
        onAddService(values);
        setSuccess("Service added successfully!");
      }
      form.reset();
      successTimeoutRef.current = setTimeout(() => {
        setSuccess("");
      }, 5000);
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    if (editingService) {
      setLoading(true);
      setError("");
      setSuccess("");

      try {
        if (!editingService.ino) {
          throw error;
        }
        const response = await deleteServiceHandler(editingService.ino);
        if (response.success) {
          onDeleteService(editingService.ino);
          setSuccess(response.success);
          form.reset();
        } else {
          setError(response.error);
          console.error(response.error);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {/* <FormField
              control={form.control}
              name="ino"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service ID</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={loading}
                      placeholder="Service ID"
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} */}
            {/* /> */}
            <FormField
              control={form.control}
              name="iname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={loading}
                      placeholder="Service Name"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="itype"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Type</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      disabled={loading}
                      className="w-full p-2 border rounded"
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rate1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rate 1</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={loading}
                      placeholder="Rate 1"
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rate2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rate 2</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={loading}
                      placeholder="Rate 2"
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rate3"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rate 3</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={loading}
                      placeholder="Rate 3"
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rate4"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rate 4</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={loading}
                      placeholder="Rate 4"
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rate5"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rate 5</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={loading}
                      placeholder="Rate 5"
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" disabled={loading} className="w-full">
            {editingService ? "Update Service" : "Add Service"}
          </Button>
          {editingService && (
            <Button
              type="button"
              onClick={onDelete}
              disabled={loading}
              className="w-full mt-2"
            >
              Delete Service
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
};
