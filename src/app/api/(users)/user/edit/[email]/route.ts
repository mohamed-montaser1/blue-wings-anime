import { dbConnect } from "@/lib";
import { User } from "@/models";
import { NextResponse } from "next/server";

type Props = { params: { email: string } };

export async function PUT(req: Request, { params }: Props) {
  await dbConnect();
  const email = params.email;
  const newUser = await req.json();
  if (!email) {
    return NextResponse.json(
      {
        success: false,
        error: "يجب عليك إدخال البريد الإلكتروني",
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
        error: "لا يوجد مستخدم بهذا البريد الإلكتروني",
      },
      { status: 404 }
    );
  }

  return await User.findOneAndUpdate(
    { email },
    {
      $set: {
        ...newUser,
      },
    }
  )
    .exec()
    .then(async () => {
      const updatedUser = await User.findOne({ email }).exec();
      return NextResponse.json(
        {
          success: true,
          error: null,
          data: updatedUser,
        },
        { status: 201 }
      );
    })
    .catch((error) => {
      return NextResponse.json(
        {
          success: false,
          error,
          data: null,
        },
        { status: 500 }
      );
    });
}
