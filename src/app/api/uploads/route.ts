import { NextResponse } from "next/server";
import imageTypesAllowed from "@/lib/imageTypesAllowed";
import { writeFile } from "fs/promises";
import { join } from "path";
import { nanoid } from "nanoid";

const uploadsDir = join(process.cwd(), "public", "uploads");

const POST = async (req: Request) => {
  const form = await req.formData();
  const image: File | null = form.get("image") as unknown as File;
  const type = image.type.split("/")[1];
  if (!imageTypesAllowed.includes(type)) {
    return NextResponse.json({
      message: "You Should Enter One of these types .jpeg , .jpg or .png",
    });
  }

  const filename = `${nanoid()}_${image.name}`;
  const bytes = await image.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const path = join(uploadsDir, filename);
  await writeFile(path, buffer);
  return NextResponse.json({ error: null, success: true, image: filename });
};

const GET = async (req: Request) => {
  const form = new FormData();
  const filename: string = form.get("filename") as unknown as string;
  console.log(join(uploadsDir, filename));
};

export { POST, GET };
