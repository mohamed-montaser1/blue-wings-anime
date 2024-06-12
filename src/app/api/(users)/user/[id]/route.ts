import { dbConnect } from "@/lib";
import User from "@/models/User";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  const id = params.id;
  await dbConnect();

  if (!isValidObjectId(id)) return NextResponse.json({ error: "Invalid ID" });
  const user = await User.findById(id);

  if (!user)
    return NextResponse.json({ error: "Cannot Find User With This Id" });

  return NextResponse.json({
    user,
  });
}
