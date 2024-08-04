import { dbConnect } from "@/lib";
import { Manga } from "@/models/Manga";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  await dbConnect();
  const url = new URL(req.url);
  const query = url.searchParams.get("q") as string;

  const manga = await Manga.find({
    $text: { $search: query },
  }).exec();

  return NextResponse.json({
    msg: "Testing",
    manga,
  });
}
