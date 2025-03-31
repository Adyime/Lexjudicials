import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

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

interface Category {
  id: string;
  name: string;
  slug: string;
  _count?: {
    blogs: number;
  };
}

interface BlogState {
  blogs: Blog[];
  filteredBlogs: Blog[];
  categories: Category[];
  currentBlog: Blog | null;
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  selectedCategory: string | null;
}

const initialState: BlogState = {
  blogs: [],
  filteredBlogs: [],
  categories: [],
  currentBlog: null,
  isLoading: false,
  error: null,
  searchQuery: "",
  selectedCategory: null,
};

export const fetchBlogs = createAsyncThunk(
  "blog/fetchBlogs",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { blog: BlogState };
      const { searchQuery, selectedCategory } = state.blog;

      // Build URL with query parameters
      let url = "/api/blogs";
      const params = new URLSearchParams();

      if (searchQuery) {
        params.append("search", searchQuery);
      }

      if (selectedCategory) {
        params.append("category", selectedCategory);
      }

      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch blogs");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchBlogBySlug = createAsyncThunk(
  "blog/fetchBlogBySlug",
  async (slug: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/blogs/slug/${slug}`);
      if (!response.ok) {
        throw new Error("Failed to fetch blog");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchCategories = createAsyncThunk(
  "blog/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/categories");
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const deleteBlog = createAsyncThunk(
  "blog/deleteBlog",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/blogs/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete blog");
      }

      return id;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload;
    },
    clearFilters: (state) => {
      state.searchQuery = "";
      state.selectedCategory = null;
      state.filteredBlogs = state.blogs;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.blogs = action.payload;
        state.filteredBlogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchBlogBySlug.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBlogBySlug.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentBlog = action.payload;
      })
      .addCase(fetchBlogBySlug.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.blogs = state.blogs.filter((blog) => blog.id !== action.payload);
        state.filteredBlogs = state.filteredBlogs.filter(
          (blog) => blog.id !== action.payload
        );
      });
  },
});

export const { setSearchQuery, setSelectedCategory, clearFilters } =
  blogSlice.actions;
export default blogSlice.reducer;
