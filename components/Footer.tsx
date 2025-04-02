"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  Phone,
  MapPin,
  Scale,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";

const practiceAreas = [
  { name: "Criminal Defense", href: "/services" },
  { name: "Corporate Law", href: "/services" },
  { name: "Civil Litigation", href: "/services" },
  { name: "Family Law", href: "/services" },
  { name: "Personal Injury", href: "/services" },
  { name: "Intellectual Property", href: "/services" },
];

const quickLinks = [
  { name: "About Us", href: "/about" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export default function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <footer className="bg-navy-dark text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] bg-repeat opacity-5 z-0"></div>
      <div className="absolute top-0 left-0 w-64 h-64 bg-secondary/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl"></div>

      <div className="container py-12 md:py-16 px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12 md:mb-16">
          <div>
            <div className="flex items-center gap-2 mb-4 md:mb-6">
              {/* <span className="text-xl md:text-2xl font-bold font-heading"> */}
              <Link href="/" className="flex items-center gap-2 z-10">
              <Image src="/Logo.png" alt="LOGO" width={120} height={50} />
              </Link>
              {/* </span> */}
            </div>
            <p className="mb-4 md:mb-6 text-white/80 text-sm md:text-base">
              Providing exceptional legal services with integrity, dedication,
              and expertise since 1995.
            </p>
            <div className="flex space-x-3 md:space-x-4">
              <Link
                href="#"
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
              >
                <Facebook className="h-4 w-4 md:h-5 md:w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
              >
                <Twitter className="h-4 w-4 md:h-5 md:w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="#"
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
              >
                <Linkedin className="h-4 w-4 md:h-5 md:w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="https://www.instagram.com/lexjudislawoffice?igsh=MWVsOG5oenB6NTBscQ=="
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
                target="_blank"
              >
                <Instagram className="h-4 w-4 md:h-5 md:w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6 font-heading">
              Practice Areas
            </h3>
            <ul className="space-y-2 md:space-y-3">
              {practiceAreas.map((area) => (
                <li key={area.name}>
                  <Link
                    href={area.href}
                    className="text-white/70 hover:text-secondary transition-colors flex items-center gap-2 text-sm md:text-base"
                  >
                    <ArrowRight className="h-3 w-3" />
                    {area.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6 font-heading">
              Quick Links
            </h3>
            <ul className="space-y-2 md:space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-secondary transition-colors flex items-center gap-2 text-sm md:text-base"
                  >
                    <ArrowRight className="h-3 w-3" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6 font-heading">
              Contact Us
            </h3>
            <div className="space-y-3 md:space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                <p className="text-white/70 text-sm md:text-base">
                Office No.8, Shiva Market, Nr Khureji  Red Light,
                <br />
                 Khureji Delhi-110051
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-secondary shrink-0" />
                <p className="text-white/70 text-sm md:text-base">
                +91 95609 68575
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-secondary shrink-0" />
                <p className="text-white/70 text-sm md:text-base">
                  office@lexjudis.com
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 md:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs md:text-sm text-white/60 mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Justice Law. All rights
              reserved.
            </p>
            {/* <div className="flex gap-4 md:gap-6">
              <Link
                href="/privacy"
                className="text-xs md:text-sm text-white/60 hover:text-secondary"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-xs md:text-sm text-white/60 hover:text-secondary"
              >
                Terms of Service
              </Link>
              <Link
                href="/sitemap"
                className="text-xs md:text-sm text-white/60 hover:text-secondary"
              >
                Sitemap
              </Link>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
}
