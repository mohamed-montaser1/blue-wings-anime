import mongoose from "mongoose";

export default async function connectDB() {
  return await mongoose
    .connect(process.env.DB_URL as string, { dbName: "Anime-DB" })
    .then((_) => console.log("Connected To The DB"))
    .catch((err) => console.log("Error While Connect With DB", err));
}
