import { Post, User } from "@/models";
import { Article } from "@/models/Article";
import { ChangeRoleRequest } from "@/models/ChangeRoleRequest";
import { Chapter } from "@/models/Chapter";
import { Comment } from "@/models/Comment";
import { Manga } from "@/models/Manga";
import { Rating } from "@/models/Rating";
import ensureIndexes from "@/utils/ensureIndexes";
import mongoose, { ConnectOptions } from "mongoose";

mongoose.set("strictPopulate", false);
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the 'MONGODB_URI' environment variable inside env file"
  );
}

async function dbConnect() {
  if (mongoose.connection.readyState >= 1) {
    return; // Already connected
  }

  await mongoose.connect(process.env.MONGODB_URI as string, {
    dbName: "Anime-DB",
  });

  await Article.init();
  await Chapter.init();
  await Comment.init();
  await Manga.init();
  await ChangeRoleRequest.init();
  await Post.init();
  await Rating.init();
  await User.init();
}

export default dbConnect;
