import { imageTypesAllowedKey } from "@/app/account/settings/page";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";
import { nanoid } from "nanoid";

const imageTypesAllowed = ["image/jpg", "image/jpeg", "image/png"];
const POST = async (req: Request, { params }: { params: { dir: string } }) => {
  const form = await req.formData();
  const dir = params.dir;
  const image: File | null = form.get("image") as unknown as File;
  const type = image.type;
  const uploadsDir = join(process.cwd(), "public", "uploads", dir);
  if (!imageTypesAllowed.includes(type as imageTypesAllowedKey)) {
    return NextResponse.json({
      error: "You Should Enter One of these types .jpeg , .jpg or .png",
      success: false,
      image: null,
    });
  }

  const filename = `${nanoid()}_${image.name}`;
  const bytes = await image.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const path = join(uploadsDir, filename);
  await writeFile(path, buffer);
  return NextResponse.json({ error: null, success: true, image: filename });
};

export { POST };
