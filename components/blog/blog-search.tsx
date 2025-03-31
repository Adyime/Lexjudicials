"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { useAppDispatch } from "@/lib/redux/hooks";
import { setSearchQuery, fetchBlogs } from "@/lib/redux/slices/blogSlice";
import { useDebounce } from "@/hooks/use-debounce";

export function BlogSearch() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("search") || "";
  const [searchInput, setSearchInput] = useState(initialQuery);
  const debouncedSearchTerm = useDebounce(searchInput, 300);
  const router = useRouter();
  const dispatch = useAppDispatch();

  // Update search when input changes (with debounce)
  useEffect(() => {
    dispatch(setSearchQuery(debouncedSearchTerm));

    // Update URL if there's a search term
    if (debouncedSearchTerm) {
      router.push(`/blog?search=${encodeURIComponent(debouncedSearchTerm)}`, {
        scroll: false,
      });
    } else if (searchParams.has("search")) {
      // Remove search param from URL if search is cleared
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.delete("search");
      router.push(
        `/blog${newParams.toString() ? `?${newParams.toString()}` : ""}`,
        { scroll: false }
      );
    }
  }, [debouncedSearchTerm, dispatch, router, searchParams]);

  const handleClearSearch = () => {
    setSearchInput("");
    dispatch(setSearchQuery(""));

    // Remove search param from URL
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.delete("search");
    router.push(
      `/blog${newParams.toString() ? `?${newParams.toString()}` : ""}`,
      { scroll: false }
    );
  };

  return (
    <div className="flex space-x-2">
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Search articles..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="pl-10 pr-10"
        />
        {searchInput && (
          <button
            onClick={handleClearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
