"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Edit,
  Trash,
  MoreVertical,
  Eye,
  Search,
  Check,
  X,
  Loader2,
} from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { fetchBlogs, deleteBlog } from "@/lib/redux/slices/blogSlice";

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  published: boolean;
  category: {
    id: string;
    name: string;
    slug: string;
  };
  createdAt: string;
}

interface AdminBlogListProps {
  onEditBlog: (blog: Blog) => void;
}

export function AdminBlogList({ onEditBlog }: AdminBlogListProps) {
  const dispatch = useAppDispatch();
  const { blogs, isLoading, error } = useAppSelector((state) => state.blog);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteClick = (blogId: string) => {
    setBlogToDelete(blogId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!blogToDelete) return;

    try {
      setIsDeleting(true);
      const response = await fetch(`/api/blogs/${blogToDelete}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to delete blog post");
      }

      // Refresh the blog list
      dispatch(fetchBlogs());

      toast({
        title: "Blog Deleted",
        description: "The blog post has been successfully deleted.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description:
          (error as Error).message ||
          "There was a problem deleting the blog post.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
      setBlogToDelete(null);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Blog Posts</CardTitle>
        <CardDescription>
          Manage your blog posts. Create, edit, or delete posts.
        </CardDescription>
        <div className="flex mt-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search blogs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center p-8 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <p className="text-red-600 dark:text-red-400">{error}</p>
            <Button
              onClick={() => dispatch(fetchBlogs())}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
            >
              Try Again
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Category
                  </TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBlogs.length > 0 ? (
                  filteredBlogs.map((blog) => (
                    <TableRow key={blog.id}>
                      <TableCell className="font-medium">
                        <div className="max-w-[200px] md:max-w-none truncate">
                          {blog.title}
                        </div>
                        <div className="text-xs text-gray-500 md:hidden mt-1">
                          {blog.category.name} •{" "}
                          {format(new Date(blog.createdAt), "MMM d, yyyy")}
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {blog.category.name}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {format(new Date(blog.createdAt), "MMM d, yyyy")}
                      </TableCell>
                      <TableCell>
                        {blog.published ? (
                          <div className="flex items-center">
                            <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                            <span className="hidden sm:inline">Published</span>
                            <span className="sm:hidden">Live</span>
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <div className="h-2.5 w-2.5 rounded-full bg-gray-400 mr-2"></div>
                            <span className="hidden sm:inline">Draft</span>
                            <span className="sm:hidden">Draft</span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end items-center space-x-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onEditBlog(blog)}
                            className="hidden sm:inline-flex"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="hidden sm:inline-flex"
                            asChild
                          >
                            <a
                              href={`/blog/${blog.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Eye className="h-4 w-4" />
                            </a>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteClick(blog.id)}
                            className="hidden sm:inline-flex text-red-500"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>

                          {/* Mobile dropdown menu */}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => onEditBlog(blog)}
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <a
                                  href={`/blog/${blog.slug}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <Eye className="mr-2 h-4 w-4" />
                                  View
                                </a>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-600 focus:text-red-600"
                                onClick={() => handleDeleteClick(blog.id)}
                              >
                                <Trash className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center py-8 text-gray-500"
                    >
                      {searchQuery
                        ? "No blog posts found matching your search"
                        : "No blog posts found. Create your first blog post!"}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              blog post.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700 text-white"
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
