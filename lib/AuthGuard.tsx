import { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AuthGuard({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  if (!session) {
    return (
      <div>
        <p>
          Access Denied. Please <Link href="/login">login</Link>.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
