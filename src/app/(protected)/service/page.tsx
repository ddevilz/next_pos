"use client";
import React, { useState, useEffect } from "react";
import { ServiceForm } from "@/components/service/service-form";
import { DataTableDemo } from "@/components/service/data-table";
import { ServiceSchemaType } from "@/schemas";

const ParentComponent: React.FC = () => {
  const [services, setServices] = useState<ServiceSchemaType[]>([]);

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

    fetchServices();
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

  const handleDeleteService = (ino: number) => {
    setServices((prevServices) =>
      prevServices.filter((service) => service.ino !== ino)
    );
  };

  return (
    <div className="flex justify-between">
      <div className="w-3/4 pr-4">
        <ServiceForm
          onAddService={handleAddService}
          onUpdateService={handleUpdateService}
          onDeleteService={handleDeleteService}
          editingService={editingService}
        />
      </div>
      <DataTableDemo
        data={services}
        onEdit={(service) => setEditingService(service)}
        onDelete={(ino) => handleDeleteService(ino)}
      />
    </div>
  );
};

export default ParentComponent;
