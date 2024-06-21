"use client";

import { logout } from "@/actions/logout";
import LogoutButton from "@/components/auth/logout-button";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";

const Dashboard = () => {
  const user = useCurrentUser();

  return (
    <div>
      {JSON.stringify(user)}
      <LogoutButton />
    </div>
  );
};

export default Dashboard;
