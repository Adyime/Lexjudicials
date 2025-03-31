"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "./ui/button";

export function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="border-b bg-background">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-semibold">
            Law Blog
          </Link>

          <div className="flex items-center gap-6">
            <Link
              href="/blog"
              className={`text-sm transition-colors hover:text-primary ${
                isActive("/blog")
                  ? "text-primary font-medium"
                  : "text-foreground"
              }`}
            >
              Blog
            </Link>

            {session?.user.role === "ADMIN" ? (
              <Link href="/admin">
                <Button variant="outline" size="sm">
                  Admin Panel
                </Button>
              </Link>
            ) : (
              <Link href="/auth/signin">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
