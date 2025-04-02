"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Scale, Lock, Mail } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTheme } from "next-themes";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function LoginPage() {
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Handle client-side mounting
  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);

  useEffect(() => {
    if (status === "authenticated") {
      // Use a timeout to ensure clean navigation
      const redirectTimer = setTimeout(() => {
        router.push("/admin");
      }, 100);
      return () => clearTimeout(redirectTimer);
    }
  }, [status, router]);

  async function onSubmit(values: FormValues) {
    setIsLoading(true);

    try {
      const response = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (response?.error) {
        toast({
          title: "Login Failed",
          description: response.error,
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      toast({
        title: "Login Successful",
        description: "Welcome to the admin dashboard.",
      });
      
      // Don't navigate immediately - let the status update effect handle it
      // This prevents navigation race conditions
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  }

  // Show loading state while checking authentication or mounting
  if (!mounted || status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary"></div>
      </div>
    );
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
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

      {/* Login Form */}
      <div className="container relative z-10 py-8 md:py-12 px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-md mx-auto bg-white/10 backdrop-blur-lg rounded-xl p-8 shadow-lg"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-secondary/20 px-3 py-1.5 rounded-full mb-4">
              <Scale className="h-4 w-4 text-secondary" />
              <span className="text-secondary font-medium text-sm font-sans">
                Admin Access
              </span>
            </div>
            <h1 className="text-3xl font-bold mb-2 text-white font-heading">Welcome Back</h1>
            <p className="text-white/80 font-sans">Sign in to access the admin dashboard</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white font-sans">Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
                        <Input
                          placeholder="Enter your email"
                          type="email"
                          className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 font-sans"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-400 font-sans" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white font-sans">Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
                        <Input
                          placeholder="Enter your password"
                          type="password"
                          className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 font-sans"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-400 font-sans" />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-sans"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </Form>
        </motion.div>
      </div>
    </section>
  );
}
