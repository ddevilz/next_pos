import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import SidebarContent from "@/app/(protected)/_component/SidebarContent";

const Sidebar = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-white" />
      </SheetTrigger>
      <SheetContent className="bg-[#26427d]" side={"left"}>
        <SidebarContent />
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
