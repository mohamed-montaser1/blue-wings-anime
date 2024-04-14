import Manga from "@/models/Manga";
import connectDB from "@/utils/connectDB";
import isAuthenticated from "@/utils/isAuthenticated";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
  await connectDB();
  let auth = isAuthenticated(req);
  if (!auth) {
    return res.status(401).json({
      message: "المستخدم غير مسجل",
    });
  }
  let filter = req.query.filter as string;
  let limit = Number(req.query.limit as string);

  if (!limit) {
    limit = 10;
  }
  let filters = [
    ["Manga", "Manhwa", "Manhua", "Comic"],
    ["Ongoing", "Completed"],
  ];
  let type;

  if (!filters.flat().includes(filter)) {
    return res.json({
      message: "لا يوجد فلتر بهذا الإسم",
      availableFilters: filters,
    });
  }

  type = filters[0].includes(filter) ? "type" : "status";

  let mangas = await Manga.find({ [type]: { $eq: filter } })
    .populate({ path: "author", select: "username avatar -_id" })
    .limit(limit);

  if (mangas.length === 0) {
    return res.json({
      message: "لا يوجد أعمال بهذا النوع حالياً",
    });
  }

  return res.status(200).json({
    results: mangas,
  });
}
