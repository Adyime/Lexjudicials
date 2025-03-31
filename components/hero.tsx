"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Scale } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";

export default function Hero() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden pt-16">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1589216532372-1c2a367900d9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGxhdyUyMGZpcm18ZW58MHx8MHx8fDA%3D"
          alt="Law firm background"
          fill
          priority
          className="object-cover"
        />
        <div
          className={`absolute inset-0 ${
            isDark
              ? "bg-gradient-to-r from-navy-dark/95 to-navy-dark/85"
              : "bg-gradient-to-r from-navy-dark/90 to-navy-dark/80"
          }`}
        ></div>
      </div>

      {/* Main Content */}
      <div className="container relative z-10 py-8 md:py-12 px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 bg-secondary/20 px-3 py-1.5 rounded-full mb-4">
              <Scale className="h-4 w-4 text-secondary" />
              <span className="text-secondary font-medium text-sm">
                Premier Legal Services
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 font-heading leading-tight text-white">
              <span className="text-gradient">Justice & Excellence</span>
              <br className="hidden sm:block" />
              <span className="text-white">For Every Client</span>
            </h1>

            <p className="text-base md:text-lg text-white/80 mb-6 max-w-xl mx-auto">
              Our team of expert attorneys is committed to protecting your
              rights and securing favorable outcomes for your case.
            </p>

            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              <Button
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 text-sm md:text-base"
                asChild
              >
                <Link href="/contact#consultation">
                  Free Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button
                variant="outline"
                className="border-white bg-black  text-white  text-sm md:text-base"
                asChild
              >
                <Link href="/services">Our Services</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
