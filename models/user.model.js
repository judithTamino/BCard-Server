import mongoose from "mongoose";
import { DEFAULT_VALIDATION, EMAIL, PHONE } from "../utils/validations.js";
import { imageSchema } from "../schemas/image.schema.js";
import { addressSchema } from "../schemas/address.schema.js";
const DEFAULT_IMAGE = '/user.png';

const nameSchema = new mongoose.Schema({
  first: DEFAULT_VALIDATION,
  middle: { ...DEFAULT_VALIDATION, required: false },
  last: DEFAULT_VALIDATION,
});

const userSchema = new mongoose.Schema({
  name: nameSchema,
  phone: PHONE,
  email: { ...EMAIL, unique: true },
  password: {
    type: String,
    trim: true,
    minLength: 8,
    required: [true, 'Password is required'],
  },
  image: imageSchema,
  address: addressSchema,
  isBusiness: { type: Boolean, required: true },
  isAdmin: { type: Boolean, default: false }
}, {timestamps: true});

const User = mongoose.model('User', userSchema);
export default User;