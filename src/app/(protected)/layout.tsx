import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/app/(protected)/_component/Navbar";

const ProtectedLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  return (
    <div className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      <Navbar />
      <div className="h-screen flex items-center justify-center  ">
        <SessionProvider session={session}>{children}</SessionProvider>
      </div>
    </div>
  );
};

export default ProtectedLayout;
