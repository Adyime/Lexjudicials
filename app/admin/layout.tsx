import { ReactNode } from "react";
import AuthGuard from "@/lib/AuthGuard";
import { AuthProvider } from "@/components/auth-provider";
import { ReduxProvider } from "@/components/redux-provider";
import "../globals.css";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <AuthProvider>{children}</AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
