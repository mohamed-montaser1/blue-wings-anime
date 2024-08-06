import { dbConnect } from "@/lib";
import { User } from "@/models/User";
import ensureIndexes from "@/utils/ensureIndexes";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  await dbConnect();
  await ensureIndexes()
  const artists = await User.find({ role: "artist" });
  return NextResponse.json({
    artists,
  });
}
