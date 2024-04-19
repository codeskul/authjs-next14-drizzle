import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = async ({ children }: ProtectedLayoutProps) => {
  const session = await auth();
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default ProtectedLayout;
