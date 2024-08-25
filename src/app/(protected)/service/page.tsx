"use client";
import React, { useState, useEffect } from "react";
import { ServiceForm } from "@/components/service/service-form";
import { DataTableDemo } from "@/components/service/data-table";
import { ServiceSchemaType } from "@/schemas";
import { deleteServiceHandler } from "@/actions/service";

const ParentComponent: React.FC = () => {
  const [services, setServices] = useState<ServiceSchemaType[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] =
    useState<ServiceSchemaType | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("/api/service");
        if (!response.ok) {
          throw new Error("Failed to fetch services");
        }
        const data = await response.json();
        setServices(data.services);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/category");
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(
          data.categories.map((cat: { category: string }) => cat.category)
        );
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchServices();
    fetchCategories();
  }, []);

  const handleAddService = (service: ServiceSchemaType) => {
    setServices((prevServices) => [...prevServices, service]);
  };

  const handleUpdateService = (updatedService: ServiceSchemaType) => {
    setServices((prevServices) =>
      prevServices.map((service) =>
        service.ino === updatedService.ino ? updatedService : service
      )
    );
  };

  const handleDeleteService = async (ino: number) => {
    try {
      const response = await deleteServiceHandler(ino);
      if (response.success) {
        setServices((prevServices) =>
          prevServices.filter((service) => service.ino !== ino)
        );
      } else {
        console.error(response.error);
      }
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4">
      <div className="lg:w-1/2 w-full">
        <ServiceForm
          onAddService={handleAddService}
          onUpdateService={handleUpdateService}
          onDeleteService={handleDeleteService}
          editingService={editingService}
          categories={categories}
        />
      </div>
      <div className="lg:w-1/2 w-full h-96 overflow-auto">
        <DataTableDemo
          data={services}
          onEdit={(service) => setEditingService(service)}
          onDelete={(ino) => handleDeleteService(ino)}
        />
      </div>
    </div>
  );
};

export default ParentComponent;
