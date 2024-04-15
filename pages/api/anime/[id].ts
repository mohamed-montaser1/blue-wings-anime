import Manga from "@/models/Manga";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({
      message: "Method not allowed",
    });
  }
  let { id } = req.query;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(422).json({
      message: "Invalid manga id",
    });
  }
  let manga = await Manga.findById(id).populate("author", "username -_id");

  if (!manga) {
    return res.status(404).json({
      message: "Manga not found",
    });
  }

  return res.status(200).json({
    manga,
  });
}
