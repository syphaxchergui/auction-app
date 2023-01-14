import Joi from "joi";

export const addItemSchema = Joi.object({
  title: Joi.string().required(),
  expirationDate: Joi.date().required(),
  minBid: Joi.number().required(),
  description: Joi.string().required(),
});

export const getItemSlugSchema = Joi.object({
  slug: Joi.string().required(),
});
