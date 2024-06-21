import React from "react";
import { Button } from "../ui/button";
import { logout } from "@/actions/logout";
import { redirect } from "next/navigation";

const LogoutButton = () => {
  const onClick = async () => {
    await logout();
  };

  return (
    <div>
      <Button onClick={onClick} type="submit">
        Sign out
      </Button>
    </div>
  );
};

export default LogoutButton;
