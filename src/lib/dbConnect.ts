import mongoose from "mongoose";

export default async function dbConnect(url?: string) {
  let uri = url ?? (process.env.DB_URL as string);
  try {
    const connection = await mongoose.connect(uri, {
      dbName: "anime-db",
    });
    console.log("-#-".repeat(20));
    console.log("DB Connected Successfully");
    console.log("-#-".repeat(20));
    return connection;
  } catch (error) {
    console.log("error while connect to the mongodb", error);
  }
}
