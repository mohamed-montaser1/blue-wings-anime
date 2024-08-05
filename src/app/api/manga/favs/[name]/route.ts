import { dbConnect } from "@/lib";
import { TDynamicAPIParams } from "@/lib/types";
import { User } from "@/models";
import { Manga } from "@/models/Manga";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: TDynamicAPIParams<["name"]>
) {
  await dbConnect();
  const { name } = params;
  const user = await User.findOne({ slug_name: name })
    .populate("favoriteManga")
    .exec();

  if (!user) {
    return NextResponse.json(
      {
        success: false,
        error: "لا يوجد مستخدم بهذا الإسم",
        data: null,
      },
      { status: 404 }
    );
  }

  return NextResponse.json(
    {
      success: true,
      error: null,
      data: user.favoriteManga,
    },
    { status: 200 }
  );
}
