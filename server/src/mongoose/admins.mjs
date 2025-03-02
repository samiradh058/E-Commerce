import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  name: { type: mongoose.Schema.Types.String, required: true },
  email: { type: mongoose.Schema.Types.String, required: true, unique: true },
  password: { type: mongoose.Schema.Types.String, required: true },
  role: { type: mongoose.Schema.Types.String, default: "admin" },
});

export const Admin =
  mongoose.models.Admin || mongoose.model("Admin", adminSchema);
