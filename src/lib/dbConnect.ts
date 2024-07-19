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
}

export default dbConnect;
