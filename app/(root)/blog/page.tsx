"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Calendar,
  Tag,
  ChevronLeft,
  ChevronRight,
  BookOpen,
} from "lucide-react";
import { format } from "date-fns";

import { BlogSearch } from "@/components/blog/blog-search";
import { BlogCategories } from "@/components/blog/blog-categories";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  fetchBlogs,
  clearFilters,
  setSearchQuery,
  setSelectedCategory,
} from "@/lib/redux/slices/blogSlice";

export default function BlogPage() {
  const dispatch = useAppDispatch();
  const { filteredBlogs, isLoading, error } = useAppSelector(
    (state) => state.blog
  );
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;
  const searchParams = useSearchParams();

  useEffect(() => {
    // Get search and category from URL params
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || null;

    // Set search and category in Redux state
    dispatch(setSearchQuery(search));
    dispatch(setSelectedCategory(category));

    // Fetch blogs
    dispatch(fetchBlogs());
  }, [dispatch, searchParams]);

  // Calculate pagination
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative flex font-display flex-col w-full min-h-screen bg-gradient-to-br from-background to-background/95">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full mb-4">
              <BookOpen className="h-4 w-4 text-primary" />
              <span className="text-primary font-medium text-sm">
                Latest Articles
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Lexjudis
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Stay informed with our latest articles on legal topics, case
              studies, and insights from our experienced attorneys.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Content Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
              ) : error ? (
                <div className="text-center p-8 bg-destructive/10 rounded-lg border border-destructive/20">
                  <p className="text-destructive">{error}</p>
                  <Button
                    onClick={() => dispatch(fetchBlogs())}
                    className="mt-4"
                  >
                    Try Again
                  </Button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {currentBlogs.length > 0 ? (
                      currentBlogs.map((blog) => (
                        <Card
                          key={blog.id}
                          className="overflow-hidden hover:shadow-lg transition-all hover:scale-[1.02] bg-card/50 backdrop-blur-sm border-primary/10"
                        >
                          <div className="relative h-48 w-full">
                            {blog.featuredImage ? (
                              <img
                                src={blog.featuredImage}
                                alt={blog.title}
                                className="object-cover w-full h-full"
                              />
                            ) : (
                              <div className="w-full h-full bg-primary/5 flex items-center justify-center">
                                <span className="text-muted-foreground">
                                  No image
                                </span>
                              </div>
                            )}
                          </div>
                          <CardHeader>
                            <div className="flex items-center text-sm mb-2 text-muted-foreground">
                              <Calendar className="h-4 w-4 mr-1" />
                              <span>
                                {format(
                                  new Date(blog.createdAt),
                                  "MMMM d, yyyy"
                                )}
                              </span>
                              <span className="mx-2">•</span>
                              <Tag className="h-4 w-4 mr-1" />
                              <span>{blog.category.name}</span>
                            </div>
                            <CardTitle className="text-xl">
                              <Link
                                href={`/blog/${blog.slug}`}
                                className="hover:text-primary transition-colors"
                              >
                                {blog.title}
                              </Link>
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="line-clamp-3 text-muted-foreground">
                              {blog.excerpt}
                            </p>
                            <br></br>
                             <p className="line-clamp-3 text-sm text-muted-foreground">
                             <i><b> Creator:</b> {blog.creator}</i>
                            </p>
                          </CardContent>
                          <CardFooter>
                            <Link href={`/blog/${blog.slug}`}>
                              <Button
                                variant="outline"
                                className="hover:bg-primary/10 border-primary/20"
                              >
                                Read More
                              </Button>
                            </Link>
                          </CardFooter>
                        </Card>
                      ))
                    ) : (
                      <div className="col-span-2 text-center p-12 bg-primary/5 rounded-lg border border-primary/10">
                        <p className="mb-4 text-muted-foreground">
                          No blog posts found matching your criteria.
                        </p>
                        <Button
                          onClick={() => dispatch(clearFilters())}
                          className="bg-primary hover:bg-primary/90"
                        >
                          Clear Filters
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Pagination */}
                  {filteredBlogs.length > blogsPerPage && (
                    <div className="flex justify-center mt-12">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                          className="hover:bg-primary/10 border-primary/20"
                        >
                          <ChevronLeft className="h-4 w-4 mr-1" />
                          Previous
                        </Button>

                        {Array.from(
                          { length: totalPages },
                          (_, i) => i + 1
                        ).map((page) => (
                          <Button
                            key={page}
                            variant={
                              currentPage === page ? "default" : "outline"
                            }
                            onClick={() => handlePageChange(page)}
                            className={
                              currentPage === page
                                ? "bg-primary/20 text-primary hover:bg-primary/25"
                                : "hover:bg-primary/10 border-primary/20"
                            }
                          >
                            {page}
                          </Button>
                        ))}

                        <Button
                          variant="outline"
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className="hover:bg-primary/10 border-primary/20"
                        >
                          Next
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="space-y-8 sticky top-24">
                <BlogSearch />
                <BlogCategories />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
