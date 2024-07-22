import { dbConnect } from "@/lib";
import { TDynamicAPIParams } from "@/lib/types";
import { Manga, TManga } from "@/models/Manga";
import { isValidSlug } from "@/utils/isValidSlug";
import { NextResponse } from "next/server";

type TParams = TDynamicAPIParams<["slug"]>;

export async function GET(req: Request, { params }: TParams) {
  await dbConnect();
  const { slug } = params;
  if (!isValidSlug(slug)) {
    return NextResponse.json(
      {
        success: false,
        error: "إسم المانجا غير صالح",
        data: null,
      },
      { status: 400 }
    );
  }

  const manga = await Manga.findOne({ slug }).exec();

  if (!manga) {
    return NextResponse.json(
      {
        success: false,
        error: "لا توجد مانجا بهذا الإسم",
        data: null,
      },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    error: null,
    data: [],
  });
}
