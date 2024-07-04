import { dbConnect } from "@/lib";
import { ChangeRoleRequest } from "@/models/ChangeRoleRequest";
import { User, UserRole } from "@/models/User";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

const roles = ["user", "admin", "artist", "editor"];

export async function POST(req: Request) {
  await dbConnect();
  const body = await req.json();
  const role = body.role as UserRole;
  const email = body.email as string;

  if (!roles.includes(role)) {
    return NextResponse.json(
      {
        success: false,
        error: "Invalid role",
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
        error: `There Is No User With (${email}) Email`,
      },
      { status: 404 }
    );
  }

  // TODO: Check If There Is No Request With the same user
  // TODO: Create New Edit Role Request
  // TODO: Save It In DB

  const isExists = await ChangeRoleRequest.findOne({ user: user._id }).exec();

  if (isExists) {
    await ChangeRoleRequest.findOneAndDelete({ user: user._id }).exec();
  }

  const changeRole = await ChangeRoleRequest.create({
    _id: new mongoose.Types.ObjectId(),
    user,
    role: user.role,
    newRole: role,
    requestDate: Date.now(),
  });

  try {
    await changeRole.save();
    return NextResponse.json({
      success: false,
      error: null,
      data: "تم الحفظ بنجاح",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error,
      data: null,
    });
  }
}

export async function GET(req: Request) {
  await dbConnect();
  const requests = await ChangeRoleRequest.find().populate("user").exec();
  return NextResponse.json({ success: true, data: requests });
}
