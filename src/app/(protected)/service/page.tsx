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
        console.log("Fetched categories:", data.categories);
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
  if (loading) {
    return <div>Loading...</div>;
  }

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
    } catch (error) {}
  };

  return (
    <div className="flex justify-between">
      <div className="w-1/2">
        <ServiceForm
          onAddService={handleAddService}
          onUpdateService={handleUpdateService}
          onDeleteService={handleDeleteService}
          editingService={editingService}
          categories={categories}
        />
      </div>
      <div className="w-1/2">
        <div className="h-full overflow-auto">
          <DataTableDemo
            data={services}
            onEdit={(service) => setEditingService(service)}
            onDelete={(ino) => handleDeleteService(ino)}
          />
        </div>
      </div>
    </div>
  );
};

export default ParentComponent;
