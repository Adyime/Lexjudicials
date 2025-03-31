"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signIn } from "next-auth/react";
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
import { Scale, Lock } from "lucide-react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { loginUser, clearError } from "@/lib/redux/slices/authSlice";

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
  const dispatch = useAppDispatch();
  const { isLoading, error, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );
  const [localLoading, setLocalLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    // Redirect if already authenticated
    if (isAuthenticated) {
      router.push("/admin");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    // Show error toast if there's an error
    if (error) {
      toast({
        title: "Login Failed",
        description: error,
        variant: "destructive",
      });
      dispatch(clearError());
    }
  }, [error, toast, dispatch]);

  // Reset loading state when component mounts
  useEffect(() => {
    setLocalLoading(false);
  }, []);

  async function onSubmit(values: FormValues) {
    setLocalLoading(true);

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
        setLocalLoading(false);
        return;
      }

      toast({
        title: "Login Successful",
        description: "Welcome to the admin dashboard.",
      });

      router.push("/admin");
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      setLocalLoading(false);
    }
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-white">Admin Login</h2>
          <p className="mt-2 text-sm text-white dark:text-gray-400">
            Sign in to access the admin dashboard
          </p>
        </div>

        <div className="mt-8  dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="admin@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-white "
                disabled={localLoading}
              >
                {localLoading ? (
                  <div className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Signing in...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Lock className="mr-2 h-4 w-4" />
                    Sign in
                  </div>
                )}
              </Button>

              {/* <div className="text-center mt-4">
                <p className="text-sm text-white dark:text-gray-400">
                  Don't have an account?{" "}
                  <Link
                    href="/admin/register"
                    className="text-blue-600 hover:text-blue-500 dark:text-blue-400"
                  >
                    Register
                  </Link>
                </p>
              </div> */}
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
