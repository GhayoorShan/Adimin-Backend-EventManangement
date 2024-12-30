import { Schema, model } from "mongoose";

// User Schema
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true, // Ensures email is stored in lowercase in the database
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "manager", "editor"],
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt fields
  }
);

export default model("User", userSchema);
