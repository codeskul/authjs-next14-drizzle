import { auth, signOut } from "@/auth";
import { LogoutButton } from "@/components/auth/logout-button";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const session = await auth();
  return (
    <div className="flex items-center justify-center h-full">
      <Button>Hello</Button>
      <p>{JSON.stringify(session)}</p>
      <LogoutButton>
        <Button>Sign out</Button>
      </LogoutButton>
    </div>
  );
}
