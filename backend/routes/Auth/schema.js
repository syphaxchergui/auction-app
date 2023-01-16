import Joi from "joi";

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(255).required(),
});

export const logoutSchema = Joi.object({
  userId: Joi.number().required(),
});
