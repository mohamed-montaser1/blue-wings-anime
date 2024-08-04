import { dbConnect } from "@/lib";
import { TDynamicAPIParams } from "@/lib/types";
import { User } from "@/models";
import { Manga } from "@/models/Manga";
import { NextResponse } from "next/server";

type TParams = TDynamicAPIParams<["name", "manga_name"]>;

export async function POST(req: Request, { params }: TParams) {
  await dbConnect();
  const { manga_name, name } = params;

  const user = await User.findOne({ slug_name: name }).exec();
  const manga = await Manga.findOne({ slug: manga_name });

  if (!user) {
    return NextResponse.json(
      {
        success: false,
        error: `لا يوجد مستخدم بالإسم (${name})`,
        data: null,
      },
      { status: 404 }
    );
  }

  if (!manga) {
    return NextResponse.json(
      {
        success: false,
        error: `لا توجد مانجا بالإسم (${manga_name})`,
        data: null,
      },
      { status: 404 }
    );
  }

  if (user.favoriteManga.includes(manga._id)) {
    return NextResponse.json({
      success: false,
      error: null,
      data: null,
    });
  }

  try {
    const newUser = await User.findOneAndUpdate(
      { slug_name: name },
      {
        $push: { favoriteManga: manga },
      },
      { new: true }
    )
      .populate("favoriteManga")
      .exec();
    return NextResponse.json(
      {
        success: false,
        error: null,
        data: newUser,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error?.message || error,
        data: null,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, { params }: TParams) {
  await dbConnect();
  const { manga_name, name } = params;

  const user = await User.findOne({ slug_name: name }).exec();
  const manga = await Manga.findOne({ slug: manga_name });

  if (!user) {
    return NextResponse.json(
      {
        success: false,
        error: `لا يوجد مستخدم بالإسم (${name})`,
        data: null,
      },
      { status: 404 }
    );
  }

  if (!manga) {
    return NextResponse.json(
      {
        success: false,
        error: `لا توجد مانجا بالإسم (${manga_name})`,
        data: null,
      },
      { status: 404 }
    );
  }

  try {
    const updatedUser = await User.findOneAndUpdate(
      { slug_name: name },
      {
        $pull: { favoriteManga: manga._id },
      },
      {
        new: true,
      }
    ).exec();
    return NextResponse.json({
      success: true,
      error: null,
      data: updatedUser,
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
