import { authOptions } from "@/lib";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";

  export const requireAuth = (handler: Promise<NextResponse<any[]>>) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
      const session = await getServerSession(req, res, authOptions);

      if (!session) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      return handler(req, res);
    };
  };
