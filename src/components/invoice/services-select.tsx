import React, { useState } from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import { useFetch } from "@/hooks/useFetch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ServicesSelectionProps {
  form: UseFormReturn;
  loading: boolean;
}

interface Category {
  catid: number;
  category: string;
}

interface Service {
  ino: number;
  iname: string;
  rate1: number;
}

interface SelectedService extends Service {
  quantity: number;
  notes: string;
}

const ServicesSelection: React.FC<ServicesSelectionProps> = ({
  form,
  loading,
}) => {
  const {
    data: categories,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useFetch("/api/category");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedService, setSelectedService] =
    useState<SelectedService | null>(null);
  const [addedServices, setAddedServices] = useState<SelectedService[]>([]);
  const {
    data: services,
    isLoading: isServicesLoading,
    isError: isServicesError,
  } = useFetch(selectedCategory ? `/api/service/${selectedCategory}` : null);

  const serviceForm = useForm({
    defaultValues: {
      iname: "",
      rate: 0,
      quantity: 1,
      notes: "",
    },
  });

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setSelectedService(null);
  };

  const handleBackClick = () => {
    setSelectedCategory(null);
  };

  const handleServiceClick = (service: Service) => {
    setSelectedService({ ...service, quantity: 1, notes: "" });
    serviceForm.setValue("iname", service.iname);
    serviceForm.setValue("rate", service.rate1);
    serviceForm.setValue("quantity", 1);
    serviceForm.setValue("notes", "");
  };

  const handleAddService = (data: any) => {
    if (selectedService) {
      setAddedServices([...addedServices, { ...selectedService, ...data }]);
      setSelectedService(null);
      serviceForm.reset();
    }
  };

  return (
    <div className="p-4">
      {selectedCategory === null ? (
        <>
          <h1 className="text-2xl font-bold mb-4 text-center">
            Select a Category
          </h1>
          {isCategoriesError && (
            <p className="text-red-500 ">Error loading categories</p>
          )}
          <div className="flex flex-wrap gap-4">
            {isCategoriesLoading ? (
              <p>Loading categories...</p>
            ) : (
              categories &&
              categories.categories.map((category: Category) => (
                <div
                  key={category.catid}
                  onClick={() => handleCategoryClick(category.category)}
                  className="w-32 h-32 bg-blue-500 text-white flex items-center justify-center cursor-pointer rounded-md"
                >
                  {category.category}
                </div>
              ))
            )}
          </div>
        </>
      ) : (
        <>
          <div>
            <button
              onClick={handleBackClick}
              className="mb-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
            >
              <svg
                className="w-4 h-4 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back
            </button>
            <h2 className="text-xl font-semibold mb-4 text-center">Services</h2>
          </div>
          {isServicesError && (
            <p className="text-red-500">Error loading services</p>
          )}
          {isServicesLoading ? (
            <p>Loading services...</p>
          ) : (
            <div className="flex flex-wrap gap-4">
              {services &&
                services.services.map((service: Service) => (
                  <div
                    key={service.ino}
                    onClick={() => handleServiceClick(service)}
                    className="w-32 h-32 bg-blue-500 text-white flex items-center justify-center cursor-pointer rounded-md"
                  >
                    {service.iname}
                  </div>
                ))}
            </div>
          )}
        </>
      )}

      {selectedService && (
        <div className="mt-4">
          <h3 className="text-lg font-bold mb-4">Add Service</h3>
          <form
            onSubmit={serviceForm.handleSubmit(handleAddService)}
            className="space-y-4"
          >
            <div className="flex space-x-4">
              <Input
                {...serviceForm.register("iname")}
                placeholder="Service Name"
                readOnly
              />
              <Input
                {...serviceForm.register("rate")}
                type="number"
                placeholder="Rate"
              />
              <Input
                {...serviceForm.register("quantity")}
                type="number"
                placeholder="Quantity"
              />
              <Input {...serviceForm.register("notes")} placeholder="Notes" />
            </div>
            <Button type="submit">Add</Button>
          </form>
        </div>
      )}

      {addedServices.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-bold mb-4">Added Services</h3>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {addedServices.map((service, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {service.iname}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {service.rate1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {service.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {service.notes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ServicesSelection;
