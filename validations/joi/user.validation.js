import Joi from "joi";

export const userSchema = Joi.object({
  name: Joi.object()
    .keys({
      first: Joi.string().required(),
      middle: Joi.string().allow(""),
      last: Joi.string().required(),
    }).required(),
  phone: Joi.string()
    .ruleset.regex(/^0(([23489]\d{7})|(5[0-9]{8}))$/)
    .rule({ message: 'Phone must be a standard Israeli phone number.' }).required(),
  email: Joi.string()
    .ruleset.regex(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)
    .rule({ message: 'Email must be a standard email' }).required(),
  password: Joi.string()
    .ruleset.regex(/((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{7,20})/)
    .rule({ message: 'Password must be at least 7 characters long and contain an uppercase letter, a lowercase letter, a number and one of the following characters !@#$%^&*-' }).required(),
  image: Joi.object()
    .keys({
      url: Joi.string()
        .ruleset.regex(/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg))$/i)
        .rule({ message: 'Image URL must be a standard URL' }).allow(""),
      alt: Joi.string().allow("")
    }),
  address: Joi.object()
    .keys({
      state: Joi.string().allow(""),
      country: Joi.string().required(),
      city: Joi.string().required(),
      street: Joi.string().required(),
      houseNumber: Joi.number().required(),
      zip: Joi.number().required()
    }).required(),
  isBusiness: Joi.boolean().required()
});

export const loginSchema = Joi.object({
  email: Joi.string()
    .ruleset.regex(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)
    .rule({ message: 'Email must be a standard email' }).required(),
  password: Joi.string()
    .ruleset.regex(/((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{7,20})/)
    .rule({ message: 'Password must be at least 7 characters long and contain an uppercase letter, a lowercase letter, a number and one of the following characters !@#$%^&*-' }).required(),
});

