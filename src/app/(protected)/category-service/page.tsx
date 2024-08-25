"use client";

import React from "react";
import CategoryPage from "../category/page";
import ParentComponent from "../service/page";

const Page = () => {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Category Section */}
      <div className="flex flex-col items-center h-1/4 w-full p-4">
        <h1 className="text-2xl mb-4">Category</h1>
        <div className="w-full flex-grow overflow-auto">
          <CategoryPage />
        </div>
      </div>

      {/* Service Section */}
      <div className="flex flex-col items-center h-3/4 w-full p-4">
        <h1 className="text-2xl mb-4">Service</h1>
        <div className="w-full flex-grow overflow-auto">
          <ParentComponent />
        </div>
      </div>
    </div>
  );
};

export default Page;
