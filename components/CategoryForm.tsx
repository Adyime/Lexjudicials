"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { toast } from "./ui/use-toast";

interface CategoryFormProps {
  initialData?: {
    id: string;
    name: string;
    description: string;
  };
  mode: "create" | "edit";
}

export function CategoryForm({ initialData, mode }: CategoryFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
  });

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        "/api/categories" + (mode === "edit" ? `/${initialData?.id}` : ""),
        {
          method: mode === "create" ? "POST" : "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save category");
      }

      toast({
        title: "Success",
        description: `Category ${
          mode === "create" ? "created" : "updated"
        } successfully`,
      });

      if (mode === "create") {
        setFormData({ name: "", description: "" });
      }

      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDelete() {
    if (!initialData?.id) return;

    if (!confirm("Are you sure you want to delete this category?")) return;

    setIsLoading(true);

    try {
      const response = await fetch(`/api/categories/${initialData.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete category");
      }

      toast({
        title: "Success",
        description: "Category deleted successfully",
      });

      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          rows={3}
        />
      </div>

      <div className="flex justify-end space-x-4">
        {mode === "edit" && (
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isLoading}
          >
            Delete
          </Button>
        )}
        <Button type="submit" disabled={isLoading}>
          {isLoading
            ? "Saving..."
            : mode === "create"
            ? "Create Category"
            : "Update Category"}
        </Button>
      </div>
    </form>
  );
}
