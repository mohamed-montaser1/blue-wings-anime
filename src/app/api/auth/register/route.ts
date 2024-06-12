import registerSchema from "@/lib/registerSchema";
import dbConnect from "@lib/dbConnect";
import { User } from "@models/User";
import { hash } from "bcrypt";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await dbConnect();
  const body = await req.json();

  const validate = registerSchema.safeParse(body);
  if (!validate.success) {
    return NextResponse.json({ message: validate.error.errors });
  }

  const user = await User.findOne({
    $or: [{ username: body.username }, { email: body.email }],
  });

  if (user) {
    return NextResponse.json(
      {
        error: true,
        message: "المستخدم موجود بالفعل",
      },
      { status: 409 }
    );
  }

  let hashPassword = await hash(body.password, 10);

  const newUser = await User.create({
    _id: new mongoose.Types.ObjectId(),
    name: body.name,
    email: body.email,
    password: hashPassword,
    role: body.role,
  });

  try {
    await newUser.save();
    return NextResponse.json(
      { user: newUser, message: "تم إنشاء الحساب بنجاح" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        user: null,
        message: `internal server error: ${error}`,
      },
      { status: 205 }
    );
  }
}
