"use client";

import { LogoutButton } from "@/app/(auth)/_components/logout-button";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";

export default function DashboardPage() {
  const user = useCurrentUser();
  return (
    <div>
      <h1>Dashboard Page!</h1>
      <p>{JSON.stringify(user)}</p>
      <LogoutButton>
        <Button>Sign Out</Button>
      </LogoutButton>
    </div>
  );
}
