import mongoose from "mongoose";
import { DEFAULT_VALIDATION } from "../utils/validations.js";

export const addressSchema = new mongoose.Schema({
  state: { type: String, trim: true },
  country: DEFAULT_VALIDATION,
  city: DEFAULT_VALIDATION,
  street: DEFAULT_VALIDATION,
  houseNumber: { type: Number, trim: true, required: true },
  zip: { type: Number, trim: true, required: true },
});