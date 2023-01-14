import { Bid } from "../../models/bid.js";
import ErrorResponse from "../../utils/errorResponse.js";

export const findBidUserProduct = async (userId, itemId) => {
  try {
    const bids = Bid.find({ userId, itemId }, "-__v  -updatedAt");
    return bids;
  } catch (err) {
    throw new ErrorResponse("Server Error", 500);
  }
};

export const createBid = async (userId, itemId, amount) => {
  try {
    const bid = Bid.create({
      userId,
      itemId,
      amount,
    });
    return bid;
  } catch (err) {
    throw new ErrorResponse("An error ocurred when creating the bid", 500);
  }
};
