import { dbConnect } from "@/lib";
import { User } from "@/models";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  await dbConnect();
  const users = await User.find().exec();
  return NextResponse.json(users);
};
