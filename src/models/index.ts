// models/index.js
import { User } from "./User";
import { Post } from "./Post";

// Export models for usage
export { User, Post };

// This ensures the models are registered with Mongoose
const models = { User, Post };
export default models;
