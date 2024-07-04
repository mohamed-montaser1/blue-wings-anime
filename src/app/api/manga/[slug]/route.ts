import { slugifyOptions } from "@/lib/slugifyOptions";
import { Manga } from "@/models/Manga";
import { NextResponse } from "next/server";
import slugify from "slugify";

type Props = { params: { slug: string } };

export async function GET(req: Request, { params }: Props) {
  const slug = params.slug;
  const isValidSlug = slugify(slug, slugifyOptions) === slug;
  if (!isValidSlug) {
    return NextResponse.json({
      success: false,
      error: "This Is Not Valid Slug!",
      data: null,
    });
  }

  const manga = await Manga.findOne({ slug })
    .populate({ path: "author", select: "name -_id" })
    .exec();

  if (!manga) {
    return NextResponse.json({
      success: false,
      error: `There Is No Manga With (${slug}) slug`,
      data: null,
    });
  }
  return NextResponse.json({ manga });
}
