import Joi from "joi";
import JoiObjectId from "joi-objectid";

const validateObjectId = JoiObjectId(Joi);

export const addAutobidSchema = Joi.object({
  userId: Joi.number().required(),
  itemId: validateObjectId().required(),
});

export const getItemAutobidsSchema = Joi.object({
  itemId: validateObjectId().required(),
});

export const getUserAutobidsSchema = Joi.object({
  userId: Joi.number().required(),
});

export const autobidSchema = Joi.object({
  userId: Joi.number().required(),
  itemId: validateObjectId().required(),
});
