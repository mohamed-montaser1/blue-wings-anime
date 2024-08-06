// ensureIndexes.js
import mongoose from "mongoose";

async function ensureIndexes() {
  const Manga = mongoose.models.Manga;
  if (Manga) {
    try {
      const existingIndexes = await Manga.listIndexes();
      const textIndex = existingIndexes.find(
        (index) => index.key.slug === 1 && index.key.name === 1
      );

      if (!textIndex) {
        // @ts-ignore
        await Manga.createIndexes({ slug: "text", name: "text" });
        console.log("Indexes created successfully.");
      } else {
        console.log("Indexes already exist.");
      }
    } catch (error) {
      console.error("Error creating indexes:", error);
    }
  }
}

export default ensureIndexes;
