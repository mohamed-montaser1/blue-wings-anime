import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";
import { nanoid } from "nanoid";

const imageTypesAllowed = ["jpg", "jpeg", "png"] as const;

type TGenerateSaveImageRoute = NextResponse<{
  error: string | null;
  success: boolean;
  image: string | null;
}>;

export async function generateSaveImageRoute(req: Request, uploadsDir: string): Promise<TGenerateSaveImageRoute> {
  const form = await req.formData();
  const image: File | null = form.get("image") as unknown as File;
  const type = image.type.split("/")[1];
  if (!imageTypesAllowed.includes(type as (typeof imageTypesAllowed)[number])) {
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
}
