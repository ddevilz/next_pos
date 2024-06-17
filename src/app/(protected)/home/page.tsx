"use client";

import { logout } from "@/actions/logout";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";

const Home = () => {
  const user = useCurrentUser();

  const onClick = async () => {
    await logout();
  };

  return (
    <div>
      {JSON.stringify(user)}
      <Button onClick={onClick} type="submit">
        Sign out
      </Button>
    </div>
  );
};

export default Home;
