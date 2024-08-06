import { dbConnect } from "@/lib";
import { User } from "@/models";
import ensureIndexes from "@/utils/ensureIndexes";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  await dbConnect();
  await ensureIndexes();
  const users = await User.find().exec();
  return NextResponse.json({ users });
};
