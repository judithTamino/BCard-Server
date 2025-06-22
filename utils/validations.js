export const DEFAULT_VALIDATION = {
  type: String,
  trim: true,
  lowercase: true,
  required: true,
};

export const PHONE = {
  type: String,
  match: /^0(([23489]\d{7})|(5[0-9]{8}))$/,
  required: [true, 'Phone number is required'],
};

export const EMAIL = {
  type: String,
  trim: true,
  lowercase: true,
  match: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
  unique: true,
  required: [true, 'Email address is required'],
};
