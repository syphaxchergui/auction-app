import Joi from "joi";

export const addUserParamsSchema = Joi.object({
  userId: Joi.number().required(),
  maxBidAmount: Joi.number().required(),
  alertBid: Joi.number().required(),
});
