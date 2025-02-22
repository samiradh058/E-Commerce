import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: mongoose.Schema.Types.String, required: true },
  email: { type: mongoose.Schema.Types.String, required: true, unique: true },
  password: { type: mongoose.Schema.Types.String, required: true },
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);
