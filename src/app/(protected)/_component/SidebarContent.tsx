import { inter } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { routes } from "@/app/(protected)/_component/sidebar-routes";
import { usePathname } from "next/navigation";

const SidebarContent = () => {
  const pathname = usePathname();
  return (
    <div className="space-y-4 py-4 flex flex-col justify-between h-full bg-[#26427d] text-white">
      <div className="px-3 py-2 flex-1 ">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className="relative w-8 h-8 mr-4">
            {/* <Image fill src={"/logo.png"} alt="Logo" /> */}
            {/* <span className="text-2xl uppercase font-bold">LOGO</span> */}
          </div>
          <h1 className={cn("text-2xl font-bold", inter.className)}>LMS</h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              href={route.href}
              key={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                pathname === route.href
                  ? "text-white bg-white/10"
                  : "text-zinc-400"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SidebarContent;
