import dotenv from "dotenv";
dotenv.config();

import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

if (!process.env.CLOUDINARY_API_KEY) {
  throw new Error("Cloudinary API key not set");
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export function uploadToCloudinary(buffer) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream((error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
}
