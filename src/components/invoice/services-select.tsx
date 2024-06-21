import React from "react";
import { UseFormReturn } from "react-hook-form";
import useSWR from "swr";

const fetcher = (url: string | URL | Request) =>
  fetch(url).then((r) => r.json());

interface ServicesSelectionProps {
  form: UseFormReturn;
  loading: boolean;
}

const ServicesSelection: React.FC<ServicesSelectionProps> = ({
  form,
  loading,
}) => {
  const { data, error, isLoading } = useSWR("/api/category", fetcher);

  return <div>ServicesSelection</div>;
};

export default ServicesSelection;
