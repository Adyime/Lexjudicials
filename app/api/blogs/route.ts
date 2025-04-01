// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/db";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
// import { z } from "zod";
// import slugify from "slugify";

// const blogSchema = z.object({
//   title: z.string().min(5),
//   excerpt: z.string().min(10),
//   content: z.string().min(50),
//   categoryId: z.string(),
//   published: z.boolean().default(false),
//   featuredImage: z.string().optional(), // Base64 encoded image
//   imageType: z.string().optional(), // MIME type
// });

// export async function GET(request: Request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const category = searchParams.get("category");
//     const search = searchParams.get("search");

//     const where: any = {
//       ...(category ? { category: { slug: category } } : {}),
//       ...(search
//         ? {
//             OR: [
//               { title: { contains: search, mode: "insensitive" } },
//               { excerpt: { contains: search, mode: "insensitive" } },
//               { content: { contains: search, mode: "insensitive" } },
//             ],
//           }
//         : {}),
//       // Only show published blogs for public API requests
//       published: true,
//     };

//     // Check if this is an admin request (from admin panel)
//     const session = await getServerSession(authOptions);
//     if (session?.user && session.user.role === "ADMIN") {
//       // If admin, show all blogs (published and drafts)
//       delete where.published;
//     }

//     const blogs = await prisma.blog.findMany({
//       where,
//       include: {
//         category: true,
//       },
//       orderBy: {
//         createdAt: "desc",
//       },
//     });

//     // Convert binary image data to base64 for frontend use
//     const blogsWithBase64Images = blogs.map((blog) => {
//       if (blog.featuredImage) {
//         const base64Image = Buffer.from(blog.featuredImage).toString("base64");
//         return {
//           ...blog,
//           featuredImage: `data:${blog.imageType};base64,${base64Image}`,
//         };
//       }
//       return blog;
//     });

//     return NextResponse.json(blogsWithBase64Images);
//   } catch (error) {
//     console.error("Error fetching blogs:", error);
//     return NextResponse.json(
//       { success: false, message: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

// export async function POST(request: Request) {
//   try {
//     const session = await getServerSession(authOptions);

//     if (!session?.user || session.user.role !== "ADMIN") {
//       return NextResponse.json(
//         { success: false, message: "Unauthorized" },
//         { status: 401 }
//       );
//     }

//     const body = await request.json();
//     const validatedData = blogSchema.parse(body);

//     const slug = slugify(validatedData.title, { lower: true, strict: true });

//     // Check if slug already exists
//     const existingBlog = await prisma.blog.findUnique({
//       where: { slug },
//     });

//     // If slug exists, append a unique identifier
//     const finalSlug = existingBlog
//       ? `${slug}-${Date.now().toString().slice(-6)}`
//       : slug;

//     // Process image if provided
//     let imageBuffer = null;
//     let imageType = null;

//     if (validatedData.featuredImage && validatedData.imageType) {
//       // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
//       const base64Data = validatedData.featuredImage.split(",")[1];
//       imageBuffer = Buffer.from(base64Data, "base64");
//       imageType = validatedData.imageType;
//     }

//     const blog = await prisma.blog.create({
//       data: {
//         title: validatedData.title,
//         slug: finalSlug,
//         excerpt: validatedData.excerpt,
//         content: validatedData.content,
//         published: validatedData.published,
//         featuredImage: imageBuffer,
//         imageType: imageType,
//         categoryId: validatedData.categoryId,
//       },
//       include: {
//         category: true,
//       },
//     });

//     // Convert binary image back to base64 for response
//     const responseData = {
//       ...blog,
//       featuredImage: blog.featuredImage
//         ? `data:${blog.imageType};base64,${Buffer.from(
//             blog.featuredImage
//           ).toString("base64")}`
//         : null,
//     };

//     return NextResponse.json({ success: true, blog: responseData });
//   } catch (error) {
//     console.error("Error creating blog:", error);

//     if (error instanceof z.ZodError) {
//       return NextResponse.json(
//         { success: false, errors: error.errors },
//         { status: 400 }
//       );
//     }

//     return NextResponse.json(
//       { success: false, message: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";
import slugify from "slugify";
import { createRoot } from "@react-three/fiber";

const blogSchema = z.object({
  title: z.string().min(5),
  excerpt: z.string().min(10),
  content: z.string().min(50),
  categoryId: z.string(),
  published: z.boolean().default(false),
  featuredImage: z.string().optional(), // Base64 encoded image
  imageType: z.string().optional(), // MIME type
  creator: z.string().optional(),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    const where: any = {
      ...(category ? { category: { slug: category } } : {}),
      ...(search
        ? {
            OR: [
              { title: { contains: search, mode: "insensitive" } },
              { excerpt: { contains: search, mode: "insensitive" } },
              { content: { contains: search, mode: "insensitive" } },
            ],
          }
        : {}),
      // Only show published blogs for public API requests
      published: true,
    };

    // Check if this is an admin request (from admin panel)
    const session = await getServerSession(authOptions);
    if (session?.user && session.user.role === "ADMIN") {
      // If admin, show all blogs (published and drafts)
      delete where.published;
    }

    const blogs = await prisma.blog.findMany({
      where,
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Convert binary image data to base64 for frontend use
    const blogsWithBase64Images = blogs.map((blog) => {
      if (blog.featuredImage) {
        const base64Image = Buffer.from(blog.featuredImage).toString("base64");
        return {
          ...blog,
          featuredImage: `data:${blog.imageType};base64,${base64Image}`,
        };
      }
      return blog;
    });

    return NextResponse.json(blogsWithBase64Images);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validatedData = blogSchema.parse(body);

    const slug = slugify(validatedData.title, { lower: true, strict: true });

    // Check if slug already exists
    const existingBlog = await prisma.blog.findUnique({
      where: { slug },
    });

    // If slug exists, append a unique identifier
    const finalSlug = existingBlog
      ? `${slug}-${Date.now().toString().slice(-6)}`
      : slug;

    // Process featured image if provided
    let imageBuffer = null;
    let imageType = null;

    if (validatedData.featuredImage && validatedData.imageType) {
      // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
      const base64Data = validatedData.featuredImage.split(",")[1];
      imageBuffer = Buffer.from(base64Data, "base64");
      imageType = validatedData.imageType;
    }

    // Create the blog post with the content that includes base64-encoded images
    const blog = await prisma.blog.create({
      data: {
        title: validatedData.title,
        slug: finalSlug,
        excerpt: validatedData.excerpt,
        content: validatedData.content, // This now includes base64-encoded images
        published: validatedData.published,
        featuredImage: imageBuffer,
        imageType: imageType,
        categoryId: validatedData.categoryId,
        creator: validatedData.creator,
      },
      include: {
        category: true,
      },
    });

    // Convert binary image back to base64 for response
    const responseData = {
      ...blog,
      featuredImage: blog.featuredImage
        ? `data:${blog.imageType};base64,${Buffer.from(
            blog.featuredImage
          ).toString("base64")}`
        : null,
    };

    return NextResponse.json({ success: true, blog: responseData });
  } catch (error) {
    console.error("Error creating blog:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
