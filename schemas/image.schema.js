import mongoose from "mongoose";

export const imageSchema = new mongoose.Schema({
  url: { type: String, trim: true, match:/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg))$/i},
  alt: { type: String },
});