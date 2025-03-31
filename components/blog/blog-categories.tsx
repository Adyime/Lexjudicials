"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  fetchCategories,
  setSelectedCategory,
} from "@/lib/redux/slices/blogSlice";

export function BlogCategories() {
  const dispatch = useAppDispatch();
  const { categories, selectedCategory } = useAppSelector(
    (state) => state.blog
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategoryClick = (slug: string) => {
    dispatch(setSelectedCategory(slug));
  };

  return (
    <ul className="space-y-2">
      {categories.map((category) => (
        <li key={category.slug} className="flex justify-between items-center">
          <Link
            href={`/blog?category=${category.slug}`}
            className={` transition-colors ${
              selectedCategory === category.slug ? " font-medium" : ""
            }`}
            onClick={() => handleCategoryClick(category.slug)}
          >
            {category.name}
          </Link>
          <span className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded-full">
            {/* Only count published blogs for the category count */}
            {category._count?.blogs || 0}
          </span>
        </li>
      ))}
    </ul>
  );
}
