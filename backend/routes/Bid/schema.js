import Joi from "joi";
import JoiObjectId from "joi-objectid";

const validateObjectId = JoiObjectId(Joi);

export const addBidSchema = Joi.object({
  itemId: validateObjectId().required(),
  userId: Joi.number().required(),
  amount: Joi.number().required(),
});

export const getAllBidsUserProductSchema = Joi.object({
  userId: Joi.number().required(),
  itemId: validateObjectId().required(),
});

export const getAllBidsProductSchema = Joi.object({
  itemId: validateObjectId().required(),
});

export const getAllBidsUserSchema = Joi.object({
  userId: Joi.number().required(),
});
