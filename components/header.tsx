"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import Image from "next/image";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsScrolled(window.scrollY > 10);

      const handleScroll = () => {
        setIsScrolled(window.scrollY > 10);
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 bg-white border-b shadow-md transition-all duration-300 py-3"
      )}
    >
      <div className="container flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 z-10">
          <Image src="/Logo.png" alt="LOGO" width={120} height={50} />
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Link
                href={item.href}
                className="text-black font-medium hover:text-gray-600 transition-colors"
              >
                {item.name}
              </Link>
            </motion.div>
          ))}

          {/* <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button> */}
          <Link href="/contact#consultation">
          <Button className="bg-black text-white hover:bg-gray-800 font-medium">
            Free Consultations
          </Button>
          </Link>
        </nav>

        {/* Mobile Navigation */}
        <div className="flex items-center gap-2 md:hidden">
          {/* <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button> */}

          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6 text-black" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] sm:w-[400px] bg-white"
            >
              <div className="flex flex-col gap-6 mt-10">
                <div className="flex justify-between items-center">
                  <Image src="/Logo.png" alt="LOGO" width={50} height={50} />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <X className="h-6 w-6 text-black" />
                  </Button>
                </div>
                <nav className="flex flex-col gap-4">
                  <AnimatePresence>
                    {navItems.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                      >
                        <Link
                          href={item.href}
                          className="text-black font-medium hover:text-gray-600 transition-colors block py-2"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  <Button className="mt-4 bg-black text-white hover:bg-gray-800 font-medium">
                    Free Consultation
                  </Button>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
