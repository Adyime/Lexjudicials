// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
// import { prisma } from "@/lib/db";
// import { z } from "zod";
// import bcrypt from "bcryptjs";

// const passwordSchema = z.object({
//   currentPassword: z.string().min(6, {
//     message: "Password must be at least 6 characters.",
//   }),
//   newPassword: z.string().min(6, {
//     message: "Password must be at least 6 characters.",
//   }),
// });

// export async function PATCH(request: Request) {
//   try {
//     const session = await getServerSession(authOptions);

//     if (!session?.user) {
//       return NextResponse.json(
//         { success: false, message: "Unauthorized" },
//         { status: 401 }
//       );
//     }

//     const body = await request.json();
//     const validatedData = passwordSchema.parse(body);

//     // Get user with password
//     const user = await prisma.user.findUnique({
//       where: { id: session.user.id },
//       select: {
//         id: true,
//         password: true,
//       },
//     });

//     if (!user) {
//       return NextResponse.json(
//         { success: false, message: "User not found" },
//         { status: 404 }
//       );
//     }

//     // Verify current password
//     const isPasswordValid = await bcrypt.compare(
//       validatedData.currentPassword,
//       user.password
//     );

//     if (!isPasswordValid) {
//       return NextResponse.json(
//         { success: false, message: "Current password is incorrect" },
//         { status: 400 }
//       );
//     }

//     // Hash new password
//     const hashedPassword = await bcrypt.hash(validatedData.newPassword, 10);

//     // Update password
//     await prisma.user.update({
//       where: { id: session.user.id },
//       data: {
//         password: hashedPassword,
//       },
//     });

//     return NextResponse.json({ success: true, message: "Password updated successfully" });
//   } catch (error) {
//     console.error("Error updating password:", error);

//     if (error instanceof z.ZodError)
//   }
// }

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcryptjs";

const passwordSchema = z.object({
  currentPassword: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  newPassword: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export async function PATCH(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validatedData = passwordSchema.parse(body);

    // Get user with password
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        password: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(
      validatedData.currentPassword,
      user.password
    );

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: "Current password is incorrect" },
        { status: 400 }
      );
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(validatedData.newPassword, 10);

    // Update password
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        password: hashedPassword,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error("Error updating password:", error);

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
