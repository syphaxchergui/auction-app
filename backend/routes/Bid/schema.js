import Joi from "joi";
import JoiObjectId from "joi-objectid";

const validateObjectId = JoiObjectId(Joi);

export const addBidSchema = Joi.object({
  itemId: validateObjectId().required(),
  userId: Joi.number().required(),
  amount: Joi.number().required(),
});
