import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";
import slugify from "slugify";

const categoryUpdateSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
});

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const category = await prisma.category.findUnique({
      where: { id: params.id },
      include: {
        _count: {
          select: {
            blogs: true,
          },
        },
      },
    });
    
    if (!category) {
      return NextResponse.json(
        { success: false, message: "Category not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(category);
  } catch (error) {
    console.error("Error fetching category:", error);
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
    const validatedData = categoryUpdateSchema.parse(body);
    
    // Check if category exists
    const existingCategory = await prisma.category.findUnique({
      where: { id: params.id },
    });
    
    if (!existingCategory) {
      return NextResponse.json(
        { success: false, message: "Category not found" },
        { status: 404 }
      );
    }
    
    // Generate new slug from name
    const slug = slugify(validatedData.name, { lower: true, strict: true });
    
    // Check if slug already exists (excluding current category)
    const slugExists = await prisma.category.findFirst({
      where: {
        slug,
        id: { not: params.id },
      },
    });
    
    if (slugExists) {
      return NextResponse.json(
        { success: false, message: "A category with this name already exists" },
        { status: 400 }
      );
    }
    
    const updatedCategory = await prisma.category.update({
      where: { id: params.id },
      data: {
        name: validatedData.name,
        slug,
      },
      include: {
        _count: {
          select: {
            blogs: true,
          },
        },
      },
    });
    
    return NextResponse.json({ success: true, category: updatedCategory });
  } catch (error) {
    console.error("Error updating category:", error);
    
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
    
    // Check if category exists
    const existingCategory = await prisma.category.findUnique({
      where: { id: params.id },
      include: {
        _count: {
          select: {
            blogs: true,
          },
        },
      },
    });
    
    if (!existingCategory) {
      return NextResponse.json(
        { success: false, message: "Category not found" },
        { status: 404 }
      );
    }
    
    // Check if category has blogs
    if (existingCategory._count.blogs > 0) {
      return NextResponse.json(
        { 
          success: false, 
          message: "Cannot delete category with associated blogs. Please reassign or delete the blogs first." 
        },
        { status: 400 }
      );
    }
    
    await prisma.category.delete({
      where: { id: params.id },
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting category:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}