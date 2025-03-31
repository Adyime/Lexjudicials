"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { useAppDispatch } from "@/lib/redux/hooks";
import {
  createCategory,
  updateCategory,
} from "@/lib/redux/slices/categorySlice";

const categoryFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
});

type FormValues = z.infer<typeof categoryFormSchema>;

interface Category {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
}

interface AdminCategoryEditorProps {
  category?: Category;
  onClose: () => void;
  onCategoryUpdated: () => void;
}

export function AdminCategoryEditor({
  category,
  onClose,
  onCategoryUpdated,
}: AdminCategoryEditorProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const dispatch = useAppDispatch();

  const form = useForm<FormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: category?.name || "",
    },
  });

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);

    try {
      if (category) {
        // Update existing category
        await dispatch(
          updateCategory({
            id: category.id,
            name: values.name,
          })
        ).unwrap();

        toast({
          title: "Category Updated",
          description: "Category has been successfully updated.",
        });
      } else {
        // Create new category
        await dispatch(
          createCategory({
            name: values.name,
          })
        ).unwrap();

        toast({
          title: "Category Created",
          description: "New category has been successfully created.",
        });
      }

      onCategoryUpdated();
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description:
          (error as Error).message ||
          "There was a problem with the category. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{category ? "Edit Category" : "Create Category"}</CardTitle>
        <CardDescription>
          {category
            ? "Update category information."
            : "Create a new category for your blog posts."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter category name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Saving..."
                  : category
                  ? "Update Category"
                  : "Create Category"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
