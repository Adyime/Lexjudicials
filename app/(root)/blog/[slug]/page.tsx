"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Calendar, Tag, ArrowLeft, BookOpen } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage: string | null;
  published: boolean;
  category: {
    id: string;
    name: string;
    slug: string;
  };
  createdAt: string;
  creator: string;
}

export default function BlogDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(`/api/blogs/slug/${slug}`);
        if (!response.ok) {
          if (response.status === 404) {
            router.push("/blog");
            return;
          }
          throw new Error("Failed to fetch blog post");
        }
        const data = await response.json();
        if (!data.published) {
          router.push("/blog");
          return;
        }
        setBlog(data);
      } catch (error) {
        console.error("Error fetching blog:", error);
        setError("Could not load the blog post. Please try again later.");
        toast({
          title: "Error",
          description: "Failed to load blog post",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    if (slug) {
      fetchBlog();
    }
  }, [slug, toast, router]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-background to-background/95">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-background/95">
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-destructive/10 px-3 py-1.5 rounded-full mb-4">
            <BookOpen className="h-4 w-4 text-destructive" />
            <span className="text-destructive font-medium text-sm">
              Error Loading Article
            </span>
          </div>
          <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-destructive to-destructive/80 bg-clip-text text-transparent">
            Oops! Something went wrong.
          </h1>
          <p className="text-muted-foreground mb-6">
            {error || "Blog post not found"}
          </p>
          <Link href="/blog">
            <Button
              variant="default"
              className="bg-primary hover:bg-primary/90"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col w-full min-h-screen bg-gradient-to-br from-background to-background/95">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32">
        {/* Background Image with Gradient Overlay */}
        {blog.featuredImage && (
          <>
            <div
              className="absolute inset-0 bg-cover bg-center opacity-30"
              style={{ backgroundImage: `url('${blog.featuredImage}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
          </>
        )}

        {/* Blog Meta & Title */}
        <div className="relative z-10 container mx-auto px-6 md:px-12 max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full mb-4">
            <BookOpen className="h-4 w-4 text-primary" />
            <span className="text-primary font-medium text-sm">Article</span>
          </div>

          <div className="flex items-center text-sm text-muted-foreground mb-4 space-x-3">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{format(new Date(blog.createdAt), "MMMM d, yyyy")}</span>
            </div>
            <span className="mx-2">•</span>
            <div className="flex items-center">
              <Tag className="h-4 w-4 mr-1" />
              <span>{blog.category.name}</span>
            </div>
            <div className="flex items-center">
              <Tag className="h-4 w-4 mr-1" />
              <span>{blog.creator}</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            {blog.title}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            {blog.excerpt}
          </p>
        </div>
      </section>

      {/* Blog Content Section */}
      <section className="relative py-16">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
          <div className="prose prose-lg dark:prose-invert prose-p:leading-loose prose-headings:text-primary prose-p:text-muted-foreground max-w-none prose-a:text-primary hover:prose-a:text-primary/80 prose-strong:text-foreground prose-code:text-primary">
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
          </div>

          <div className="mt-16 flex justify-center">
            <Link href="/blog">
              <Button
                variant="outline"
                className="hover:bg-primary/10 border-primary/20"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
