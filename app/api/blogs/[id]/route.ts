import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";
import slugify from "slugify";

const blogUpdateSchema = z.object({
  title: z.string().min(5).optional(),
  excerpt: z.string().min(10).optional(),
  content: z.string().min(50).optional(),
  creator: z.string().optional(),
  categoryId: z.string().optional(),
  published: z.boolean().optional(),
  featuredImage: z.string().optional(), // Base64 encoded image
  imageType: z.string().optional(), // MIME type
});

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const blog = await prisma.blog.findUnique({
      where: { id: params.id },
      include: {
        category: true,
      },
    });

    if (!blog) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    // Convert binary image to base64 for frontend use
    let responseData = blog;
    if (blog.featuredImage) {
      const base64Image = Buffer.from(blog.featuredImage).toString("base64");
      responseData = {
        ...blog,
        featuredImage: `data:${blog.imageType};base64,${base64Image}`,
      };
    }

    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validatedData = blogUpdateSchema.parse(body);

    // Check if blog exists
    const existingBlog = await prisma.blog.findUnique({
      where: { id: params.id },
    });

    if (!existingBlog) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    // If title is updated, update slug as well
    let updateData: any = { ...validatedData };
    if (validatedData.title) {
      const newSlug = slugify(validatedData.title, {
        lower: true,
        strict: true,
      });

      // Check if new slug already exists (excluding current blog)
      const slugExists = await prisma.blog.findFirst({
        where: {
          slug: newSlug,
          id: { not: params.id },
        },
      });

      // If slug exists, append a unique identifier
      updateData.slug = slugExists
        ? `${newSlug}-${Date.now().toString().slice(-6)}`
        : newSlug;
    }

    // Process image if provided
    if (validatedData.featuredImage && validatedData.imageType) {
      // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
      const base64Data = validatedData.featuredImage.split(",")[1];
      updateData.featuredImage = Buffer.from(base64Data, "base64");
      updateData.imageType = validatedData.imageType;
    } else if (validatedData.featuredImage === null) {
      // If explicitly set to null, remove the image
      updateData.featuredImage = null;
      updateData.imageType = null;
    }

    const updatedBlog = await prisma.blog.update({
      where: { id: params.id },
      data: updateData,
      include: {
        category: true,
      },
    });

    // Convert binary image back to base64 for response
    const responseData = {
      ...updatedBlog,
      featuredImage: updatedBlog.featuredImage
        ? `data:${updatedBlog.imageType};base64,${Buffer.from(
            updatedBlog.featuredImage
          ).toString("base64")}`
        : null,
    };

    return NextResponse.json({ success: true, blog: responseData });
  } catch (error) {
    console.error("Error updating blog:", error);

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

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Check if blog exists
    const existingBlog = await prisma.blog.findUnique({
      where: { id: params.id },
    });

    if (!existingBlog) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    await prisma.blog.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
