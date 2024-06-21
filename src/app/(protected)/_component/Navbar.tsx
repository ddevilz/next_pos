"use client";

import React, { useState } from "react";
import Sidebar from "./Sidebar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import LogoutButton from "@/components/auth/logout-button";

const Navbar = () => {
  const [selectedRate, setSelectedRate] = useState("rate-1");

  const handleRateChange = (value: string) => {
    setSelectedRate(value);
    localStorage.setItem("rate-type", value);
  };

  return (
    <div className="p-3 flex items-center justify-between bg-black">
      <div>
        <Sidebar />
      </div>
      <div className="flex items-center justify-between">
        <div>
          <Select onValueChange={handleRateChange}>
            <SelectTrigger className="w-[150px] outline-none border-none">
              <SelectValue placeholder="Rate type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="rate-1">rate-1</SelectItem>
                <SelectItem value="rate-2">rate-2</SelectItem>
                <SelectItem value="rate-3">rate-3</SelectItem>
                <SelectItem value="rate-4">rate-4</SelectItem>
                <SelectItem value="rate-5">rate-5</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <LogoutButton />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
