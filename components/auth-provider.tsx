"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode, useEffect } from "react";
import { useAppDispatch } from "@/lib/redux/hooks";
import { setUser } from "@/lib/redux/slices/authSlice";
import { useSession } from "next-auth/react";

export function AuthProvider({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <AuthSync>{children}</AuthSync>
    </SessionProvider>
  );
}

// Component to sync NextAuth session with Redux state
function AuthSync({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (session?.user) {
      dispatch(
        setUser({
          id: session.user.id as string,
          name: session.user.name || "",
          email: session.user.email || "",
          role: (session.user.role as string) || "USER",
        })
      );
    }
  }, [session, dispatch]);

  return <>{children}</>;
}
