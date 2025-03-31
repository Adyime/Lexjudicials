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
  Search,
  Plus,
  FileText,
} from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  fetchCategories,
  deleteCategory,
} from "@/lib/redux/slices/categorySlice";

interface Category {
  id: string;
  name: string;
  slug: string;
  _count?: {
    blogs: number;
  };
  createdAt: string;
}

interface AdminCategoryListProps {
  onEditCategory: (category: Category) => void;
  onCreateCategory: () => void;
}

export function AdminCategoryList({
  onEditCategory,
  onCreateCategory,
}: AdminCategoryListProps) {
  const dispatch = useAppDispatch();
  const { categories, isLoading, error } = useAppSelector(
    (state) => state.category
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteClick = (categoryId: string) => {
    setCategoryToDelete(categoryId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!categoryToDelete) return;

    try {
      await dispatch(deleteCategory(categoryToDelete)).unwrap();

      toast({
        title: "Category Deleted",
        description: "The category has been successfully deleted.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description:
          (error as Error).message ||
          "There was a problem deleting the category.",
        variant: "destructive",
      });
    } finally {
      setDeleteDialogOpen(false);
      setCategoryToDelete(null);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <CardTitle>Categories</CardTitle>
            <CardDescription className="my-2">
              Manage your blog categories. Create, edit, or delete categories.
            </CardDescription>
          </div>
          <Button
            onClick={onCreateCategory}
            className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Category
          </Button>
        </div>
        <div className="flex mt-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="text-center py-8 text-red-500">
            <p>{error}</p>
            <Button
              onClick={() => dispatch(fetchCategories())}
              variant="outline"
              className="mt-4"
            >
              Try Again
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">Slug</TableHead>
                  <TableHead>Blog Posts</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Created
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCategories.length > 0 ? (
                  filteredCategories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell className="font-medium">
                        {category.name}
                        <div className="text-xs text-gray-500 md:hidden mt-1">
                          {format(new Date(category.createdAt), "MMM d, yyyy")}
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell max-w-[150px] truncate">
                        {category.slug}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 text-gray-500 mr-2" />
                          <span>{category._count?.blogs || 0}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {format(new Date(category.createdAt), "MMM d, yyyy")}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end items-center space-x-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onEditCategory(category)}
                            className="hidden sm:inline-flex"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteClick(category.id)}
                            className="hidden sm:inline-flex text-red-500"
                            disabled={
                              category._count?.blogs
                                ? category._count.blogs > 0
                                : false
                            }
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
                                onClick={() => onEditCategory(category)}
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-600 focus:text-red-600"
                                onClick={() => handleDeleteClick(category.id)}
                                disabled={
                                  category._count?.blogs
                                    ? category._count.blogs > 0
                                    : false
                                }
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
                      No categories found
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
              category.
              {filteredCategories.find((c) => c.id === categoryToDelete)?._count
                ?.blogs > 0 && (
                <p className="mt-2 text-red-500 font-semibold">
                  Warning: This category contains blog posts. Delete or reassign
                  them first.
                </p>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-row gap-2">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700 text-white"
              disabled={
                filteredCategories.find((c) => c.id === categoryToDelete)
                  ?._count?.blogs > 0
              }
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
