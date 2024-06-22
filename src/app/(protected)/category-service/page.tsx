"use client";

import React from "react";
import CategoryPage from "../category/page";
import ParentComponent from "../service/page";

const Page = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-col items-center">
        <h1 className="text-2xl mb-4">Category</h1>
        <div className="h-1/4 w-full">
          <CategoryPage />
        </div>
      </div>
      <div className="flex flex-col items-center mt-4">
        <h1 className="text-2xl mb-4">Service</h1>
        <div className="h-3/4 w-full">
          <ParentComponent />
        </div>
      </div>
    </div>
  );
};

export default Page;
