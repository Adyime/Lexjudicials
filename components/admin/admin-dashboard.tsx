"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { AdminSettings } from "@/components/admin/admin-settings";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminUserList } from "@/components/admin/admin-user-list";
import { AdminUserEditor } from "@/components/admin/admin-user-editor";
import { AdminCategoryList } from "@/components/admin/admin-category-list";
import { AdminCategoryEditor } from "@/components/admin/admin-category-editor";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { setActiveTab } from "@/lib/redux/slices/uiSlice";
import { setUser } from "@/lib/redux/slices/authSlice";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { AdminBlogEditor } from "./admin-blogEditor";
import { AdminBlogList } from "./admin-blogList";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
}

export function AdminDashboard() {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const { activeTab } = useAppSelector((state) => state.ui);
  const [editingBlog, setEditingBlog] = useState<any>(null);
  const [editingUser, setEditingUser] = useState<User | undefined>(undefined);
  const [editingCategory, setEditingCategory] = useState<Category | undefined>(
    undefined
  );
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Sync session user with Redux state
    if (session?.user) {
      dispatch(
        setUser({
          id: session.user.id as string,
          name: session.user.name || "",
          email: session.user.email || "",
          role: (session.user.role as string) || "USER",
        })
      );
    }
  }, [session, dispatch]);

  // Close sidebar on tab change for mobile
  useEffect(() => {
    setSidebarOpen(false);
  }, [activeTab]);

  if (!session?.user) {
    return null;
  }

  // const isAdmin = session.user.role === "ADMIN";
  const isAdmin = true;

  return (
    <div className="relative flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-background to-background/95">
      {/* Mobile sidebar toggle */}
      <div className="md:hidden p-4 bg-gradient-to-r from-primary/5 to-primary/10 border-b border-primary/10 flex items-center justify-between backdrop-blur-sm">
        <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
          Admin Dashboard
        </h1>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle sidebar"
          className="border-primary/20 hover:bg-primary/10"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Sidebar - hidden on mobile unless toggled */}
      <div
        className={`
        ${
          sidebarOpen
            ? "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            : "hidden"
        } 
        md:relative md:block md:bg-transparent md:z-auto
      `}
      >
        <div
          className={`
          w-64 bg-gradient-to-b from-background to-background/95 border-r border-primary/10
          h-screen overflow-y-auto transition-transform duration-300 ease-in-out shadow-xl
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:sticky 
        `}
        >
          <AdminSidebar
            activeTab={activeTab}
            setActiveTab={(tab) => dispatch(setActiveTab(tab))}
            isAdmin={isAdmin}
            onClose={() => setSidebarOpen(false)}
          />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-4 md:p-8 overflow-x-hidden">
        <Tabs
          value={activeTab}
          onValueChange={(value) => dispatch(setActiveTab(value))}
          className="w-full"
        >
          <TabsList className="hidden md:flex w-full mb-4 md:mb-0 bg-gradient-to-r from-primary/5 to-primary/10 p-1 rounded-lg">
            <TabsTrigger
              value="blogs"
              className="flex-1 data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
            >
              Blog Posts
            </TabsTrigger>
            <TabsTrigger
              value="new-blog"
              className="flex-1 data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
            >
              New Blog
            </TabsTrigger>
            <TabsTrigger
              value="categories"
              className="flex-1 data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
            >
              Categories
            </TabsTrigger>
            {isAdmin && (
              <TabsTrigger
                value="users"
                className="flex-1 data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
              >
                Users
              </TabsTrigger>
            )}
            <TabsTrigger
              value="settings"
              className="flex-1 data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
            >
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="blogs"
            className="mt-2 md:mt-6 bg-card/50 rounded-lg p-4 shadow-lg backdrop-blur-sm"
          >
            <AdminBlogList
              onEditBlog={(blog) => {
                setEditingBlog(blog);
                dispatch(setActiveTab("edit-blog"));
              }}
            />
          </TabsContent>

          <TabsContent
            value="new-blog"
            className="mt-2 md:mt-6 bg-card/50 rounded-lg p-4 shadow-lg backdrop-blur-sm"
          >
            <AdminBlogEditor />
          </TabsContent>

          <TabsContent
            value="edit-blog"
            className="mt-2 md:mt-6 bg-card/50 rounded-lg p-4 shadow-lg backdrop-blur-sm"
          >
            <AdminBlogEditor blog={editingBlog} />
          </TabsContent>

          <TabsContent
            value="categories"
            className="mt-2 md:mt-6 bg-card/50 rounded-lg p-4 shadow-lg backdrop-blur-sm"
          >
            {editingCategory || isCreatingCategory ? (
              <AdminCategoryEditor
                category={editingCategory}
                onClose={() => {
                  setEditingCategory(undefined);
                  setIsCreatingCategory(false);
                }}
                onCategoryUpdated={() => {
                  setEditingCategory(undefined);
                  setIsCreatingCategory(false);
                }}
              />
            ) : (
              <AdminCategoryList
                onEditCategory={(category) => setEditingCategory(category)}
                onCreateCategory={() => setIsCreatingCategory(true)}
              />
            )}
          </TabsContent>

          {isAdmin && (
            <TabsContent
              value="users"
              className="mt-2 md:mt-6 bg-card/50 rounded-lg p-4 shadow-lg backdrop-blur-sm"
            >
              {editingUser ? (
                <AdminUserEditor
                  user={editingUser}
                  onClose={() => setEditingUser(undefined)}
                  onUserUpdated={() => {
                    setEditingUser(undefined);
                  }}
                />
              ) : (
                <AdminUserList onEditUser={(user) => setEditingUser(user)} />
              )}
            </TabsContent>
          )}

          <TabsContent
            value="settings"
            className="mt-2 md:mt-6 bg-card/50 rounded-lg p-4 shadow-lg backdrop-blur-sm"
          >
            <AdminSettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
