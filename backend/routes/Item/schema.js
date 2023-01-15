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

export const deleteItemSlugSchema = Joi.object({
  slug: Joi.string().required(),
});

export const searchItemsSchema = Joi.object({
  q: Joi.string().required(),
});

export const getItemsSchema = Joi.object({
  page: Joi.number().required(),
  limit: Joi.number().required(),
});
