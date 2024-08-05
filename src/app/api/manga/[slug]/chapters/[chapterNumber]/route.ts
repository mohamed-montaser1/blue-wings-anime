import { dbConnect } from "@/lib";
import { TDynamicAPIParams } from "@/lib/types";
import { TChapter } from "@/models/Chapter";
import { Manga } from "@/models/Manga";
import { NextResponse } from "next/server";

type TParams = TDynamicAPIParams<["slug", "chapterNumber"]>;

export async function GET(req: Request, { params }: TParams) {
  await dbConnect();
  const { chapterNumber, slug } = params;
  const manga = await Manga.findOne({ slug })
    .populate({
      path: "chapters",
      populate: [
        {
          path: "comments",
          model: "Comment",
          populate: [{ path: "author", model: "User" }],
        },
      ],
    })
    .exec();
  if (!manga) {
    return NextResponse.json(
      {
        success: false,
        error: `لا يوجد عمل بهذا الإسم (${slug})`,
        data: null,
      },
      { status: 404 }
    );
  }

  const chapter = (manga.chapters as TChapter[]).find((chapter, idx) => {
    return Number(chapter.number) === Number(chapterNumber);
  });

  if (!chapter) {
    return NextResponse.json(
      {
        success: false,
        error: `لا يوجد فصل بهذا الرقم (${chapterNumber})`,
        data: null,
      },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    error: null,
    data: chapter,
  });
}
