import { join } from "path";
import { generateSaveImageRoute } from "@utils/generateSaveImageRoute";

const uploadsDir = join(process.cwd(), "public", "uploads", "profiles-covers");

const POST = async (req: Request) => {
  return await generateSaveImageRoute(req, uploadsDir);
};

const GET = async (req: Request) => {
  const form = new FormData();
  const filename: string = form.get("filename") as unknown as string;
  return join(uploadsDir, filename);
};

export { POST, GET };
