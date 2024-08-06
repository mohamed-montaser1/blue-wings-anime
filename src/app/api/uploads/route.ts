import { NextResponse } from "next/server";
import {
  imageTypesAllowed,
  imageTypesAllowedKey,
} from "@/utils/imageTypesAllowed";
import { nanoid } from "nanoid";

export async function POST(req: Request) {
  const form = await req.formData();
  const image: File | null = form.get("image") as unknown as File;
  const type = image.type;

  if (!imageTypesAllowed.includes(type as imageTypesAllowedKey)) {
    return NextResponse.json({
      error: `يجب عليك إدخال صورة بإمتداد ${imageTypesAllowed.join(" , ")}`,
      success: false,
      image: null,
      type,
    });
  }

  //? API: https://bluewingsm.x7md.workers.dev/
  const image_name = `https://bluewingsm.x7md.workers.dev/${nanoid()}-${image.name}`;
  await fetch(image_name, {
    method: "PUT",
    headers: {
      "Content-Type": type,
    },
    body: image,
  });
  return NextResponse.json({
    error: null,
    success: true,
    filename: image_name,
  });
}
