import { dbConnect } from "@/lib";
import { TDynamicAPIParams } from "@/lib/types";
import { User } from "@/models";
import { NextResponse } from "next/server";

type TParams = TDynamicAPIParams<["name"]>;

export async function GET(req: Request, { params }: TParams) {
  await dbConnect();
  const { name } = params;

  const users = await User.find({ slug_name: name }).exec();
  if (!users || users.length < 1) {
    return NextResponse.json({
      success: true,
      data: null,
      error: null,
    });
  }

  if (users.length > 1) {
    return NextResponse.json({
      success: false,
      data: null,
      error: "يوجد مستخدم آخر بنفس الإسم",
    });
  }

  return NextResponse.json({
    success: true,
    data: null,
    error: null,
  });
}
