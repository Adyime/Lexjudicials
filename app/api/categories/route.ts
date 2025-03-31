import { NextResponse } from "next/server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";
import slugify from "slugify";
import { prisma } from "@/lib/db";

const categorySchema = z.object({
  name: z.string().min(2),
});

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: {
            blogs: {
              where: {
                published: true, // Only count published blogs
              },
            },
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
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
    const validatedData = categorySchema.parse(body);

    const slug = slugify(validatedData.name, { lower: true, strict: true });

    // Check if category already exists
    const existingCategory = await prisma.category.findFirst({
      where: {
        OR: [{ name: validatedData.name }, { slug }],
      },
    });

    if (existingCategory) {
      return NextResponse.json(
        { success: false, message: "Category already exists" },
        { status: 400 }
      );
    }

    const category = await prisma.category.create({
      data: {
        name: validatedData.name,
        slug,
      },
      include: {
        _count: {
          select: {
            blogs: {
              where: {
                published: true, // Only count published blogs
              },
            },
          },
        },
      },
    });

    return NextResponse.json({ success: true, category });
  } catch (error) {
    console.error("Error creating category:", error);

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
