import mongoose from 'mongoose';
import { DEFAULT_VALIDATION, EMAIL, PHONE } from '../utils/validations.js';
import { imageSchema } from '../schemas/image.schema.js';
import { addressSchema } from '../schemas/address.schema.js'

const cardSchema = new mongoose.Schema({
  title: DEFAULT_VALIDATION,
  subtitle: DEFAULT_VALIDATION,
  description: { ...DEFAULT_VALIDATION, maxLength: 1024 },
  phone: PHONE,
  email: EMAIL,
  web: {
    type: String,
    trim: true,
    match: /^(https?:\/\/)?(www\.)?([\w-]+(\.[\w-]+)+)(:\d+)?(\/[\w-./?%&=]*)?$/
  },
  image: imageSchema,
  address: addressSchema,
  bizNumber: {
    type: Number,
    required: true
  },
  likes: [String],
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

const Card = mongoose.model('Card', cardSchema);
export default Card;