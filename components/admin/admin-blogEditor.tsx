// "use client";

// import { useState, useEffect, useRef } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
//   FormDescription,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Switch } from "@/components/ui/switch";
// import { useToast } from "@/hooks/use-toast";
// import { Upload, X, Loader2 } from "lucide-react";
// import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
// import { fetchCategories } from "@/lib/redux/slices/categorySlice";
// import { fetchBlogs } from "@/lib/redux/slices/blogSlice";
// import { TipTapEditor } from "../tiptap-editor";

// const formSchema = z.object({
//   title: z.string().min(5, {
//     message: "Title must be at least 5 characters.",
//   }),
//   excerpt: z.string().min(10, {
//     message: "Excerpt must be at least 10 characters.",
//   }),
//   content: z.string().min(50, {
//     message: "Content must be at least 50 characters.",
//   }),
//   categoryId: z.string({
//     required_error: "Please select a category.",
//   }).min(1, {
//     message: "Please select a category.",
//   }),
//   published: z.boolean().default(false),
//   featuredImage: z.string().optional(),
//   imageType: z.string().optional(),
//   creator: z.string().optional(),
// });

// type FormValues = z.infer<typeof formSchema>;

// interface AdminBlogEditorProps {
//   blog?: any;
// }

// export function AdminBlogEditor({ blog }: AdminBlogEditorProps) {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [featuredImageUrl, setFeaturedImageUrl] = useState<string | null>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const { toast } = useToast();
//   const dispatch = useAppDispatch();
//   const { categories } = useAppSelector((state) => state.category);

//   const form = useForm<FormValues>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       title: "",
//       excerpt: "",
//       content: "",
//       categoryId: "",
//       published: false,
//       featuredImage: "",
//       imageType: "",
//       creator: "",
//     },
//   });

//   useEffect(() => {
//     // Fetch categories when component mounts
//     dispatch(fetchCategories());
//   }, [dispatch]);

//   // Watch for form value changes and validate categoryId
//   useEffect(() => {
//     const subscription = form.watch((value, { name }) => {
//       // If the form is touched and categoryId is empty, show the error
//       if (name === 'categoryId' && form.formState.isSubmitted) {
//         if (!value.categoryId) {
//           form.setError('categoryId', {
//             type: 'manual',
//             message: 'Please select a category.'
//           });
//         } else {
//           form.clearErrors('categoryId');
//         }
//       }
//     });
    
//     return () => subscription.unsubscribe();
//   }, [form]);

//   useEffect(() => {
//     if (blog) {
//       form.reset({
//         title: blog.title,
//         excerpt: blog.excerpt,
//         creator: blog.creator,
//         content:
//           blog.content ||
//           "This would be the full content of the blog post in a real implementation.",
//         categoryId:
//           blog.categoryId ||
//           categories.find((c) => c.name === blog.category)?.id ||
//           "",
//         published: blog.published,
//         featuredImage: blog.featuredImage || "",
//         imageType: blog.imageType || "",
//       });

//       if (blog.featuredImage) {
//         setFeaturedImageUrl(blog.featuredImage);
//       }
//     }
//   }, [blog, form, categories]);

//   async function onSubmit(values: FormValues) {
//     // Additional validation check for category selection
//     if (!values.categoryId || values.categoryId.trim() === '') {
//       form.setError('categoryId', {
//         type: 'manual',
//         message: 'Please select a category before submitting.'
//       });
      
//       toast({
//         title: "Validation Error",
//         description: "Please select a category for your blog post.",
//         variant: "destructive",
//       });
//       return;
//     }
    
//     setIsSubmitting(true);

//     try {
//       const endpoint = blog ? `/api/blogs/${blog.id}` : "/api/blogs";
//       const method = blog ? "PATCH" : "POST";

//       const response = await fetch(endpoint, {
//         method,
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(values),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || "Failed to save blog post");
//       }

//       const data = await response.json();

//       // Refresh the blog list
//       dispatch(fetchBlogs());

//       toast({
//         title: blog ? "Blog Updated" : "Blog Created",
//         description: blog
//           ? "Your blog post has been successfully updated."
//           : "Your blog post has been successfully created.",
//       });

//       if (!blog) {
//         form.reset();
//         setFeaturedImageUrl(null);
//       }
//     } catch (error) {
//       toast({
//         title: "Error",
//         description:
//           (error as Error).message ||
//           "There was a problem saving your blog post. Please try again.",
//         variant: "destructive",
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   }

//   const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (!file) return;

//     // Check file size (limit to 5MB)
//     if (file.size > 5 * 1024 * 1024) {
//       toast({
//         title: "File too large",
//         description: "Image must be less than 5MB",
//         variant: "destructive",
//       });
//       return;
//     }

//     const reader = new FileReader();
//     reader.onload = (e) => {
//       const result = e.target?.result as string;
//       setFeaturedImageUrl(result);
//       form.setValue("featuredImage", result);
//       form.setValue("imageType", file.type);
//     };
//     reader.readAsDataURL(file);
//   };

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>
//           {blog ? "Edit Blog Post" : "Create New Blog Post"}
//         </CardTitle>
//         <CardDescription>
//           {blog
//             ? "Update your blog post with the form below."
//             : "Fill out the form below to create a new blog post."}
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//             <FormField
//               control={form.control}
//               name="title"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Title</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Enter blog title" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="excerpt"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Excerpt</FormLabel>
//                   <FormControl>
//                     <Textarea
//                       placeholder="Brief summary of the blog post"
//                       className="resize-none"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="categoryId"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>
//                     Category <span className="text-red-500">*</span>
//                   </FormLabel>
//                   <Select
//                     onValueChange={(value) => {
//                       field.onChange(value);
//                       // Clear the error when a value is selected
//                       if (value) {
//                         form.clearErrors('categoryId');
//                       }
//                     }}
//                     defaultValue={field.value}
//                     value={field.value}
//                   >
//                     <FormControl>
//                       <SelectTrigger className={form.formState.errors.categoryId ? "border-red-300 ring-red-500" : ""}>
//                         <SelectValue placeholder="Select a category" />
//                       </SelectTrigger>
//                     </FormControl>
//                     <SelectContent>
//                       {categories.length > 0 ? (
//                         categories.map((category) => (
//                           <SelectItem key={category.id} value={category.id}>
//                             {category.name}
//                           </SelectItem>
//                         ))
//                       ) : (
//                         <div className="p-2 text-center text-gray-500">
//                           No categories found. Please create a category first.
//                         </div>
//                       )}
//                     </SelectContent>
//                   </Select>
//                   <FormDescription>
//                     Required. Select a category for your blog post.
//                   </FormDescription>
//                   <FormMessage className="text-red-500 font-medium" />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="creator"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Creator</FormLabel>
//                   <FormControl>
//                     <Textarea
//                       placeholder="Creator Name and Designation"
//                       className="resize-none"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="featuredImage"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Featured Image</FormLabel>
//                   <div className="space-y-4">
//                     {featuredImageUrl && (
//                       <div className="relative h-48 w-full rounded-md overflow-hidden border">
//                         <img
//                           src={featuredImageUrl}
//                           alt="Featured"
//                           className="object-cover w-full h-full"
//                         />
//                       </div>
//                     )}
//                     <FormControl>
//                       <div className="flex items-center space-x-4">
//                         <input
//                           type="file"
//                           accept="image/*"
//                           ref={fileInputRef}
//                           onChange={handleImageUpload}
//                           className="hidden"
//                         />
//                         <Button
//                           type="button"
//                           variant="outline"
//                           onClick={() => fileInputRef.current?.click()}
//                         >
//                           <Upload className="mr-2 h-4 w-4" />
//                           Upload Image
//                         </Button>
//                         {featuredImageUrl && (
//                           <Button
//                             type="button"
//                             variant="outline"
//                             onClick={() => {
//                               setFeaturedImageUrl(null);
//                               form.setValue("featuredImage", "");
//                               form.setValue("imageType", "");
//                             }}
//                           >
//                             <X className="mr-2 h-4 w-4" />
//                             Remove Image
//                           </Button>
//                         )}
//                       </div>
//                     </FormControl>
//                     <FormMessage />
//                   </div>
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="content"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Content</FormLabel>
//                   <FormControl>
//                     <div className="min-h-[300px] border rounded-md overflow-hidden">
//                       <TipTapEditor
//                         content={field.value}
//                         onChange={field.onChange}
//                       />
//                     </div>
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="published"
//               render={({ field }) => (
//                 <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
//                   <div className="space-y-0.5">
//                     <FormLabel className="text-base">Publish</FormLabel>
//                     <FormDescription>
//                       {field.value
//                         ? "This post will be visible to the public."
//                         : "This post will be saved as a draft."}
//                     </FormDescription>
//                   </div>
//                   <FormControl>
//                     <Switch
//                       checked={field.value}
//                       onCheckedChange={field.onChange}
//                     />
//                   </FormControl>
//                 </FormItem>
//               )}
//             />

//             <div className="flex justify-end space-x-4">
//               <Button type="button" variant="outline">
//                 Cancel
//               </Button>
//               <Button
//                 type="submit"
//                 className="bg-blue-600 hover:bg-blue-700 text-white"
//                 disabled={isSubmitting || categories.length === 0 || !form.getValues('categoryId')}
//               >
//                 {isSubmitting ? (
//                   <>
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                     {blog ? "Updating..." : "Creating..."}
//                   </>
//                 ) : blog ? (
//                   "Update Post"
//                 ) : (
//                   "Create Post"
//                 )}
//               </Button>
//             </div>
//           </form>
//         </Form>
//       </CardContent>
//     </Card>
//   );
// }

"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Upload, X, Loader2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { fetchCategories } from "@/lib/redux/slices/categorySlice";
import { fetchBlogs } from "@/lib/redux/slices/blogSlice";
import { TipTapEditor } from "../tiptap-editor";
import imageCompression from 'browser-image-compression';

const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  excerpt: z.string().min(10, {
    message: "Excerpt must be at least 10 characters.",
  }),
  content: z.string().min(50, {
    message: "Content must be at least 50 characters.",
  }),
  categoryId: z.string({
    required_error: "Please select a category.",
  }).min(1, {
    message: "Please select a category.",
  }),
  published: z.boolean().default(false),
  featuredImage: z.string().optional(),
  imageType: z.string().optional(),
  creator: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface AdminBlogEditorProps {
  blog?: any;
}

export function AdminBlogEditor({ blog }: AdminBlogEditorProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [featuredImageUrl, setFeaturedImageUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.category);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      excerpt: "",
      content: "",
      categoryId: "",
      published: false,
      featuredImage: "",
      imageType: "",
      creator: "",
    },
  });

  useEffect(() => {
    // Fetch categories when component mounts
    dispatch(fetchCategories());
  }, [dispatch]);

  // Watch for form value changes and validate categoryId
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      // If the form is touched and categoryId is empty, show the error
      if (name === 'categoryId' && form.formState.isSubmitted) {
        if (!value.categoryId) {
          form.setError('categoryId', {
            type: 'manual',
            message: 'Please select a category.'
          });
        } else {
          form.clearErrors('categoryId');
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [form]);

  useEffect(() => {
    if (blog) {
      form.reset({
        title: blog.title,
        excerpt: blog.excerpt,
        creator: blog.creator,
        content:
          blog.content ||
          "This would be the full content of the blog post in a real implementation.",
        categoryId:
          blog.categoryId ||
          categories.find((c) => c.name === blog.category)?.id ||
          "",
        published: blog.published,
        featuredImage: blog.featuredImage || "",
        imageType: blog.imageType || "",
      });

      if (blog.featuredImage) {
        setFeaturedImageUrl(blog.featuredImage);
      }
    }
  }, [blog, form, categories]);

  async function onSubmit(values: FormValues) {
    // Additional validation check for category selection
    if (!values.categoryId || values.categoryId.trim() === '') {
      form.setError('categoryId', {
        type: 'manual',
        message: 'Please select a category before submitting.'
      });
  
      toast({
        title: "Validation Error",
        description: "Please select a category for your blog post.",
        variant: "destructive",
      });
      return;
    }
  
    setIsSubmitting(true);
  
    try {
      console.log("Form values being submitted:", values); // Log form values
  
      const endpoint = blog ? `/api/blogs/${blog.id}` : "/api/blogs";
      const method = blog ? "PATCH" : "POST";
  
      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save blog post");
      }
  
      const data = await response.json();
  
      // Refresh the blog list
      dispatch(fetchBlogs());
  
      toast({
        title: blog ? "Blog Updated" : "Blog Created",
        description: blog
          ? "Your blog post has been successfully updated."
          : "Your blog post has been successfully created.",
      });
  
      if (!blog) {
        form.reset();
        setFeaturedImageUrl(null);
      }
    } catch (error) {
      console.error("Error saving blog post:", error); // Log error details
      toast({
        title: "Error",
        description:
          (error as Error).message ||
          "There was a problem saving your blog post. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }
  

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Image must be less than 5MB",
        variant: "destructive",
      });
      return;
    }

    try {
      // Compress the image
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 1 , // Compress to a maximum of 1MB
        maxWidthOrHeight: 720, // Adjust the maximum width or height if needed
        useWebWorker: true, // Use web workers for better performance
      });

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setFeaturedImageUrl(result);
        form.setValue("featuredImage", result);
        form.setValue("imageType", compressedFile.type);
      };
      reader.readAsDataURL(compressedFile);
    } catch (error) {
      toast({
        title: "Error compressing image",
        description: "There was a problem compressing the image. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {blog ? "Edit Blog Post" : "Create New Blog Post"}
        </CardTitle>
        <CardDescription>
          {blog
            ? "Update your blog post with the form below."
            : "Fill out the form below to create a new blog post."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter blog title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="excerpt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Excerpt</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Brief summary of the blog post"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Category <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      // Clear the error when a value is selected
                      if (value) {
                        form.clearErrors('categoryId');
                      }
                    }}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className={form.formState.errors.categoryId ? "border-red-300 ring-red-500" : ""}>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.length > 0 ? (
                        categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))
                      ) : (
                        <div className="p-2 text-center text-gray-500">
                          No categories found. Please create a category first.
                        </div>
                      )}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Required. Select a category for your blog post.
                  </FormDescription>
                  <FormMessage className="text-red-500 font-medium" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="creator"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Creator</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Creator Name and Designation"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="featuredImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Featured Image</FormLabel>
                  <div className="space-y-4">
                    {featuredImageUrl && (
                      <div className="relative h-48 w-full rounded-md overflow-hidden border">
                        <img
                          src={featuredImageUrl}
                          alt="Featured"
                          className="object-cover w-full h-full"
                        />
                      </div>
                    )}
                    <FormControl>
                      <div className="flex items-center space-x-4">
                        <input
                          type="file"
                          accept="image/*"
                          ref={fileInputRef}
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <Upload className="mr-2 h-4 w-4" />
                          Upload Image
                        </Button>
                        {featuredImageUrl && (
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                              setFeaturedImageUrl(null);
                              form.setValue("featuredImage", "");
                              form.setValue("imageType", "");
                            }}
                          >
                            <X className="mr-2 h-4 w-4" />
                            Remove Image
                          </Button>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <div className="min-h-[300px] border rounded-md overflow-hidden">
                      <TipTapEditor
                        content={field.value}
                        onChange={field.onChange}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="published"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Publish</FormLabel>
                    <FormDescription>
                      {field.value
                        ? "This post will be visible to the public."
                        : "This post will be saved as a draft."}
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline">
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white"
                disabled={isSubmitting || categories.length === 0 || !form.getValues('categoryId')}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {blog ? "Updating..." : "Creating..."}
                  </>
                ) : blog ? (
                  "Update Post"
                ) : (
                  "Create Post"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
