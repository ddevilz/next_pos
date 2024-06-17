import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";

const ProtectedLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  return (
    <div className="h-screen flex items-center justify-center  bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800 ">
      <SessionProvider session={session}>{children}</SessionProvider>
    </div>
  );
};

export default ProtectedLayout;
