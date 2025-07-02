import { loginSchema, userSchema } from "./joi/user.validation.js";

const VALIDATOR = process.env.VALIDATOR;

export const userValidation = user => {
  switch (VALIDATOR) {
    case "Joi":
      const { error } = userSchema.validate(user);
      if (error)
        return error.details.map(detail => detail.message);
  }
}

export const loginValidation = user => {
  switch (VALIDATOR) {
    case "Joi":
      const { error } = loginSchema.validate(user);
      if (error)
        return error.details.map(detail => detail.message);
  }
}