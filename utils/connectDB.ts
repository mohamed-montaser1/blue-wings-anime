import mongoose from "mongoose";
import User from "../models/User"; // Adjust path as necessary

type TConnection = {
  isConnected?: boolean;
};

const connection: TConnection = {}; // This object will store the database connection

async function connectDB() {
  // Check if we have connection to our databse
  if (connection.isConnected) {
    return;
  }

  // Connect to our database
  const db = await mongoose.connect(process.env.DB_URL as string, {
    dbName: "Anime-DB",
  });

  connection.isConnected = Boolean(db.connections[0].readyState);
}

export default connectDB;
