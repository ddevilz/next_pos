"use client";
import React, { useEffect, useState } from "react";
import { CategoryForm } from "@/components/category/category-form";
import { DataTableDemo, Category } from "@/components/category/data-table";

const CategoryPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/category");
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleAddCategory = (newCategory: Category) => {
    setCategories([...categories, newCategory]);
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
  };

  const handleUpdateCategory = (updatedCategory: Category) => {
    setCategories(
      categories.map((cat) =>
        cat.catid === updatedCategory.catid ? updatedCategory : cat
      )
    );
    setEditingCategory(null);
  };

  const handleDeleteCategory = (catid: string) => {
    setCategories((prevCategories) =>
      prevCategories.filter((category) => category.catid !== catid)
    );
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4">
      <div className="lg:w-1/2 w-full">
        <CategoryForm
          onAddCategory={handleAddCategory}
          onUpdateCategory={handleUpdateCategory}
          onDeleteCategory={handleDeleteCategory}
          editingCategory={editingCategory}
        />
      </div>
      <div className="lg:w-1/2 w-full h-96 overflow-auto">
        <DataTableDemo
          data={categories}
          onEdit={handleEditCategory}
          onDelete={handleDeleteCategory}
        />
      </div>
    </div>
  );
};

export default CategoryPage;
