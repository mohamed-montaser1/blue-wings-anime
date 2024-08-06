import { dbConnect } from "@/lib";
import { User } from "@/models";
import { Manga } from "@/models/Manga";
import ensureIndexes from "@/utils/ensureIndexes";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  await dbConnect();
  await ensureIndexes()
  const url = new URL(req.url);
  const query = url.searchParams.get("q") as string;
  const role = url.searchParams.get("role") as string;
  const email = url.searchParams.get("email") as string;

  if (role === "editor") {
    const user = await User.findOne({ email }).exec();
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "لا يوجد مستخدم بهذا البريد الإلكتروني",
          data: null,
        },
        { status: 404 }
      );
    }

    const manga = await Manga.find({
      $text: { $search: query },
      author: user._id,
    }).exec();
    return NextResponse.json({
      success: true,
      error: null,
      data: manga,
    });
  }
  
  const manga = await Manga.find({
    $text: { $search: query },
  }).exec();

  return NextResponse.json({
    success: true,
    error: null,
    manga,
  });
}
