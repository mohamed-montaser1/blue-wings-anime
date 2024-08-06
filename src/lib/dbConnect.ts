import { Post, User } from "@/models";
import { Article } from "@/models/Article";
import { ChangeRoleRequest } from "@/models/ChangeRoleRequest";
import { Chapter } from "@/models/Chapter";
import { Comment } from "@/models/Comment";
import { Manga } from "@/models/Manga";
import { Rating } from "@/models/Rating";
import mongoose, { Mongoose } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

declare global {
  var mongoose: MongooseCache;
}

// Global is used to maintain a cached connection across hot reloads in development.
// This prevents connections growing exponentially during API Route usage.
let cached: MongooseCache = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect(): Promise<Mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  cached.conn = await cached.promise;

  await Article.init();
  await Chapter.init();
  await Comment.init();
  await Manga.init();
  await ChangeRoleRequest.init();
  await Post.init();
  await Rating.init();
  await User.init();
  return cached.conn;
}

export default dbConnect;
