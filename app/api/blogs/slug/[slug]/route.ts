import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const blog = await prisma.blog.findUnique({
      where: { slug: params.slug },
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
      const base64Image = Buffer.from(blog.featuredImage).toString('base64');
      responseData = {
        ...blog,
        featuredImage: `data:${blog.imageType};base64,${base64Image}`,
      };
    }
    
    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error fetching blog by slug:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}