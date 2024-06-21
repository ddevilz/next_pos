"use client";

import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import CustomerForm from "@/components/invoice/customer-form";
import CombinedForm from "@/components/invoice/combined-forms";
const Order = () => {
  return (
    <>
      <div className="flex h-full items-center justify-center p-6">
        <CombinedForm />
      </div>
    </>
  );
};

export default Order;
