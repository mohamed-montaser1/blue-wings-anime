import { imageTypesAllowedKey } from "@/app/account/settings/page";
import { NextResponse } from "next/server";
import { existsSync, mkdirSync } from "fs";
import { readFile, readdir, writeFile } from "fs/promises";
import { join } from "path";
import { nanoid } from "nanoid";

const imageTypesAllowed = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
];

type TParams = {
  params: {
    dir: string[];
  };
};

const POST = async (req: Request, { params }: TParams) => {
  const form = await req.formData();
  const dir = params.dir.join("/");
  const image: File | null = form.get("image") as unknown as File;
  const type = image.type;
  const uploadsDir = join(process.cwd(), "public", "uploads", dir);

  if (!existsSync(uploadsDir)) {
    mkdirSync(uploadsDir, { recursive: true });
  }

  if (!imageTypesAllowed.includes(type as imageTypesAllowedKey)) {
    return NextResponse.json({
      error: `يجب عليك إدخال صورة بإمتداد ${imageTypesAllowed.join(" , ")}`,
      success: false,
      image: null,
      type,
    });
  }

  const filename = `${nanoid()}_${image.name}`;
  const bytes = await image.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const path = join(uploadsDir, filename);
  await writeFile(path, buffer);
  return NextResponse.json({ error: null, success: true, image: filename });
};
async function GET(req: Request, { params }: TParams) {
  const dir = params.dir.join("/");
  const uploadsDir = join(process.cwd(), "public", "uploads", dir);
  if (!existsSync(uploadsDir)) {
    return NextResponse.json({
      success: false,
      error: `There Is No Dir On Uploads With (${dir}) name`,
      data: null,
    });
  }
  let files = await readdir(uploadsDir);
  files = files.map((file) => {
    return join("/uploads", dir, file);
  });
  return NextResponse.json({ success: true, data: files, error: null });
}

export { POST, GET };
