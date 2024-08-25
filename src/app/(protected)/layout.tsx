import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/app/(protected)/_component/Navbar";

const ProtectedLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800 flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center p-4 sm:p-6 lg:p-1">
        <SessionProvider session={session}>{children}</SessionProvider>
      </div>
    </div>
  );
};

export default ProtectedLayout;
