import Joi from 'joi';

const cardValidation = Joi.object({
  title: Joi.string().required(),
  subtitle: Joi.string().required(),
  description: Joi.string().required(),
  phone: Joi.string()
    .ruleset.regex(/^0(([23489]\d{7})|(5[0-9]{8}))$/)
    .rule({ message: 'Phone must be a standard Israeli phone number.' }).required(),
  email: Joi.string()
    .ruleset.regex(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)
    .rule({ message: 'Email must be a standard email' }).required(),
  web: Joi.string()
    .ruleset.regex(/^(https?:\/\/)?(www\.)?([\w-]+(\.[\w-]+)+)(:\d+)?(\/[\w-./?%&=]*)?$/)
    .rule({ message: 'Web must be valid URL address.' }).allow(""),
  image: Joi.object()
    .keys({
      url: Joi.string()
        .ruleset.regex(/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg))$/i)
        .rule({ message: 'Image URL must be a standard URL' }).allow(""),
      alt: Joi.string().allow("")
    }).required(),
  address: Joi.object()
    .keys({
      state: Joi.string().allow(""),
      country: Joi.string().required(),
      city: Joi.string().required(),
      street: Joi.string().required(),
      houseNumber: Joi.number().required(),
      zip: Joi.number().required()
    }).required(),
});

export default cardValidation;