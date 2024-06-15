import { poppins } from "@/lib/fonts";
import { cn } from "@/lib/utils";

interface HeaderProps {
  label: string;
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <h1
        className={cn("text-4xl text-center font-semibold", poppins.className)}
      >
        Laundry Management System
      </h1>
      <p className="text-muted-foreground">{label}</p>
    </div>
  );
};
