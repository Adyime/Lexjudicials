import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join, extname } from "path";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const filename =
      file.name.replace(/\.[^/.]+$/, "") +
      "-" +
      uniqueSuffix +
      extname(file.name);

    // Save to public/uploads
    const uploadDir = join(process.cwd(), "public", "uploads");
    await writeFile(join(uploadDir, filename), buffer);

    return NextResponse.json({
      url: `/uploads/${filename}`,
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error uploading file" },
      { status: 500 }
    );
  }
}
