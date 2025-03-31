"use client";

import { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { toast } from "./ui/use-toast";
import { useRouter } from "next/navigation";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface PostFormProps {
  initialData?: {
    title: string;
    content: string;
    published: boolean;
    categoryId: string;
    slug?: string;
  };
  categories: Category[];
  mode: "create" | "edit";
}

export function PostForm({ initialData, categories, mode }: PostFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit],
    content: initialData?.content || "",
  });

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    categoryId: initialData?.categoryId || "",
    published: initialData?.published || false,
  });

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        "/api/posts" +
          (mode === "edit" && initialData?.slug ? `/${initialData.slug}` : ""),
        {
          method: mode === "create" ? "POST" : "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: formData.title,
            content: editor?.getHTML() || "",
            categoryId: formData.categoryId,
            published: formData.published,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save post");
      }

      toast({
        title: "Success",
        description: `Post ${
          mode === "create" ? "created" : "updated"
        } successfully`,
      });

      router.push("/admin/posts");
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
    if (!initialData?.slug) return;

    if (!confirm("Are you sure you want to delete this post?")) return;

    setIsLoading(true);

    try {
      const response = await fetch(`/api/posts/${initialData.slug}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete post");
      }

      toast({
        title: "Success",
        description: "Post deleted successfully",
      });

      router.push("/admin/posts");
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
    <form onSubmit={onSubmit} className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select
          value={formData.categoryId}
          onValueChange={(value) =>
            setFormData({ ...formData, categoryId: value })
          }
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Content</Label>
        <div className="min-h-[200px] border rounded-md p-4">
          <EditorContent editor={editor} />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Label htmlFor="published">Published</Label>
        <input
          type="checkbox"
          id="published"
          checked={formData.published}
          onChange={(e) =>
            setFormData({ ...formData, published: e.target.checked })
          }
          className="h-4 w-4"
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
            Delete Post
          </Button>
        )}
        <Button type="submit" disabled={isLoading}>
          {isLoading
            ? "Saving..."
            : mode === "create"
            ? "Create Post"
            : "Update Post"}
        </Button>
      </div>
    </form>
  );
}
