import { ReactNode } from "react";
import { AuthProvider } from "@/components/auth-provider";
import { ReduxProvider } from "@/components/redux-provider";
import { Montserrat, Cormorant_Garamond } from "next/font/google";
import "../globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
});

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div suppressHydrationWarning className={`auth-layout ${montserrat.variable} ${cormorant.variable}`}>
      <ReduxProvider>
        <AuthProvider>{children}</AuthProvider>
      </ReduxProvider>
    </div>
  );
}
