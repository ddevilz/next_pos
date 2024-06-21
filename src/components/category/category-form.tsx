"use client";
import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CategorySchema, CategorySchemaType } from "@/schemas";
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
  createCategoryHandler,
  modifyCategoryHandler,
  deleteCategoryHandler,
} from "@/actions/category";

type CategoryFormProps = {
  onAddCategory: (category: CategorySchemaType) => void;
  onUpdateCategory: (category: CategorySchemaType) => void;
  editingCategory: CategorySchemaType | null;

  onDeleteCategory: (catid: string) => void;
};

export const CategoryForm: React.FC<CategoryFormProps> = ({
  onAddCategory,
  onUpdateCategory,
  editingCategory,

  onDeleteCategory,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const successTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const form = useForm<CategorySchemaType>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      catid: "",
      category: "",
    },
  });

  useEffect(() => {
    if (editingCategory) {
      form.setValue("catid", editingCategory.catid);
      form.setValue("category", editingCategory.category);
    } else {
      form.reset();
    }
  }, [editingCategory, form]);

  useEffect(() => {
    return () => {
      if (successTimeoutRef.current) {
        clearTimeout(successTimeoutRef.current);
      }
    };
  }, []);

  const onSubmit = async (values: CategorySchemaType) => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (editingCategory) {
        await modifyCategoryHandler(values.catid, values);
        onUpdateCategory(values);
        setSuccess("Category updated successfully!");
      } else {
        await createCategoryHandler(values);
        onAddCategory(values);
        setSuccess("Category added successfully!");
      }
      form.reset();
      successTimeoutRef.current = setTimeout(() => {
        setSuccess("");
      }, 50);
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const onDelete = async () => {
    if (editingCategory) {
      setLoading(true);
      setError("");
      setSuccess("");

      try {
        const res = await deleteCategoryHandler(editingCategory.catid);
        if (res.error) {
          setError(res.error);
        } else {
          onDeleteCategory(editingCategory.catid);
          setSuccess("Category deleted successfully!");
          form.reset();
          successTimeoutRef.current = setTimeout(() => {
            setSuccess("");
          }, 5000);
        }
      } catch (error) {
        setError("An error occurred. Please try again.");
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
            <FormField
              control={form.control}
              name="catid"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category ID</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={loading}
                      placeholder="Category ID"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={loading}
                      placeholder="Category Name"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <div className="flex justify-between">
            <Button type="submit" disabled={loading} className="w-full">
              {editingCategory ? "Update Category" : "Add Category"}
            </Button>
            {editingCategory && (
              <Button
                type="button"
                onClick={onDelete}
                disabled={loading}
                className="w-full ml-4"
              >
                Delete Category
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};
