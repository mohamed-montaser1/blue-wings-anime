import { dbConnect } from "@/lib";
import { Manga, TManga } from "@/models/Manga";
import { Rating, TRating } from "@/models/Rating";
import { isValidSlug } from "@/utils/isValidSlug";
import { NextResponse } from "next/server";

type Props = { params: { slug: string } };

export async function GET(req: Request, { params }: Props) {
  await dbConnect();
  const slug = params.slug;
  const is_valid_slug_name = isValidSlug(slug);
  if (!is_valid_slug_name) {
    return NextResponse.json(
      {
        success: false,
        error: `${slug} Is Not Valid Slug!`,
        data: null,
      },
      { status: 400 }
    );
  }

  let manga: TManga = await Manga.findOne({ slug })
    .populate({ path: "author", select: "name -_id" })
    .populate({ path: "rating" })
    .exec();

  if (!manga) {
    return NextResponse.json(
      {
        success: false,
        error: `There Is No Manga With (${slug}) slug`,
        data: null,
      },
      { status: 404 }
    );
  }

  return NextResponse.json({
    manga: Object.assign({}, (manga as unknown as { _doc: TManga })._doc, {
      ratingNumber: sum(manga.rating) / manga.rating.length,
    }),
  });
}
/**
 *
 * @param arr Array<TRating>
 * @returns sum of rating
 */
function sum(arr: Array<TRating>) {
  return arr.reduce((acc, user) => acc + user.rating, 0);
}

export async function DELETE(req: Request, { params }: Props) {
  await dbConnect();
  const slug = params.slug;
  const is_valid_slug_name = isValidSlug(slug);
  if (!is_valid_slug_name) {
    return NextResponse.json(
      {
        success: false,
        error: `${slug} Is Not Valid Slug!`,
        data: null,
      },
      { status: 400 }
    );
  }
  const manga = await Manga.findOne({ slug }).exec();
  if (!manga) {
    return NextResponse.json({
      success: false,
      error: `There Is No Manga With (${slug}) slug`,
      data: null,
    });
  }

  try {
    await Manga.findOneAndDelete({ slug }).exec();
    return NextResponse.json({
      success: true,
      error: null,
      data: null,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error,
        data: null,
      },
      { status: 500 }
    );
  }
}
