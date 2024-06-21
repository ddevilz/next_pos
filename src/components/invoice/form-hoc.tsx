import React, { ReactNode } from "react";
import { UseFormReturn } from "react-hook-form";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Form } from "@/components/ui/form";

interface FormHOCProps {
  title?: string;
  form: UseFormReturn;
  children: (loading: boolean) => ReactNode;
}

const FormHOC: React.FC<FormHOCProps> = ({ title, form, children }) => {
  const [loading, setLoading] = React.useState(false);

  return (
    <Card className="w-full">
      {title && (
        <CardHeader>
          <span className="font-semibold text-center">{title}</span>
        </CardHeader>
      )}
      <CardContent>
        <Form {...form}>
          <div className="space-y-6">
            <div className="space-y-4">{children(loading)}</div>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
};

export default FormHOC;
