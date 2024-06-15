import { TriangleAlert } from "lucide-react";

import CardWrapper from "@/components/wrapper/card-wrapper";

export const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong!"
      backButtonHref="/login"
      backButtonLabel="Back to login"
    >
      <div className="w-full flex justify-center items-center">
        <TriangleAlert className="text-destructive" />
      </div>
    </CardWrapper>
  );
};
