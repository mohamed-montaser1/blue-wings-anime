import { User } from "@/models";
import { ChangeRoleRequest } from "@/models/ChangeRoleRequest";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.formData();
  const email = body.get("email");

  if (!email) {
    return NextResponse.json(
      {
        success: false,
        error: "يجب عليك إدخال المعرف الخاص بالمستخدم",
        data: null,
      },
      { status: 400 }
    );
  }

  const user = await User.findOne({ email }).exec();

  if (!user) {
    return NextResponse.json(
      {
        success: false,
        error: "لا يوجد مستخدم بهاذا البريد الإلكتروني",
        data: null,
      },
      { status: 404 }
    );
  }

  const request = await ChangeRoleRequest.findOne({
    user: user._id,
  }).exec();

  const newRole = request.newRole;

  try {
    await User.findOneAndUpdate({ email }, { role: newRole }).exec();
    await ChangeRoleRequest.findOneAndDelete({ user: user._id }).exec();

    return NextResponse.json({
      success: true,
      error: null,
      data: "تم تغيير المنصب بنجاح",
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
