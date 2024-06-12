import { dbConnect } from "@/lib";
import { User } from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  await dbConnect();
  const artists = await User.find({ role: "artist" });
  return NextResponse.json({
    artists,
  });
}
