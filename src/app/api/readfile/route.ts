import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import fs from "fs";
import { join } from "path";

export async function GET(req: NextApiRequest) {
  const url = req.url as string;
  const query = url.substr(url.indexOf("?filename")).substr(1);
  const filename = query.split("=")[1];
  const filePath = join(process.cwd(), "/uploads/", filename);
  try {
    let data = fs.readFileSync(filePath);
    let fileUrl = `data:image/jpeg;base64,${data.toString("base64")}`;
    return NextResponse.json({ success: true, err: null, url: fileUrl });
  } catch (err) {
    return NextResponse.json({ success: false, err });
  }
}
