"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Scale,
  FileText,
  PlusCircle,
  Settings,
  LogOut,
  Home,
  Users,
  Tag,
  X,
} from "lucide-react";
import { useAppDispatch } from "@/lib/redux/hooks";
import { logoutUser, resetAuthState } from "@/lib/redux/slices/authSlice";

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isAdmin?: boolean;
  onClose?: () => void;
}

export function AdminSidebar({
  activeTab,
  setActiveTab,
  isAdmin = false,
  onClose,
}: AdminSidebarProps) {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(resetAuthState());
    dispatch(logoutUser());
  };

  return (
    <div className="relative p-6 bg-gradient-to-b from-background via-background/95 to-background/90 flex flex-col h-full backdrop-blur-sm">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-2">
          <Scale className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            Admin Panel
          </span>
        </div>
        {onClose && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="md:hidden hover:bg-primary/10"
          >
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>

      <nav className="flex-1 space-y-2">
        <Button
          variant={activeTab === "blogs" ? "default" : "ghost"}
          className={`w-full justify-start transition-colors ${
            activeTab === "blogs"
              ? "bg-primary/20 text-primary hover:bg-primary/25"
              : "hover:bg-primary/10"
          }`}
          onClick={() => setActiveTab("blogs")}
        >
          <FileText className="mr-2 h-5 w-5" />
          Blog Posts
        </Button>

        <Button
          variant={activeTab === "new-blog" ? "default" : "ghost"}
          className={`w-full justify-start transition-colors ${
            activeTab === "new-blog"
              ? "bg-primary/20 text-primary hover:bg-primary/25"
              : "hover:bg-primary/10"
          }`}
          onClick={() => setActiveTab("new-blog")}
        >
          <PlusCircle className="mr-2 h-5 w-5" />
          New Blog Post
        </Button>

        <Button
          variant={activeTab === "categories" ? "default" : "ghost"}
          className={`w-full justify-start transition-colors ${
            activeTab === "categories"
              ? "bg-primary/20 text-primary hover:bg-primary/25"
              : "hover:bg-primary/10"
          }`}
          onClick={() => setActiveTab("categories")}
        >
          <Tag className="mr-2 h-5 w-5" />
          Categories
        </Button>

        {isAdmin && (
          <Button
            variant={activeTab === "users" ? "default" : "ghost"}
            className={`w-full justify-start transition-colors ${
              activeTab === "users"
                ? "bg-primary/20 text-primary hover:bg-primary/25"
                : "hover:bg-primary/10"
            }`}
            onClick={() => setActiveTab("users")}
          >
            <Users className="mr-2 h-5 w-5" />
            User Management
          </Button>
        )}

        <Button
          variant={activeTab === "settings" ? "default" : "ghost"}
          className={`w-full justify-start transition-colors ${
            activeTab === "settings"
              ? "bg-primary/20 text-primary hover:bg-primary/25"
              : "hover:bg-primary/10"
          }`}
          onClick={() => setActiveTab("settings")}
        >
          <Settings className="mr-2 h-5 w-5" />
          Settings
        </Button>
      </nav>

      <div className="pt-6 border-t border-primary/10 space-y-2">
        <Link href="/">
          <Button
            variant="ghost"
            className="w-full justify-start hover:bg-primary/10"
          >
            <Home className="mr-2 h-5 w-5" />
            Back to Website
          </Button>
        </Link>

        <Button
          variant="ghost"
          className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-5 w-5" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}
