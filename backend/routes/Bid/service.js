import { Bid } from "../../models/bid.js";
import ErrorResponse from "../../utils/errorResponse.js";

export const findBidUserProduct = async (userId, itemId) => {
  try {
    const bids = Bid.find({ userId, itemId }, "-__v  -updatedAt").sort({
      createdAt: -1,
    });
    return bids;
  } catch (err) {
    throw new ErrorResponse("Server Error", 500);
  }
};

export const findBidProduct = async (itemId) => {
  try {
    const bids = Bid.find({ itemId }, "-__v  -updatedAt").sort({
      createdAt: -1,
    });
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

export const deleteBidsByItem = async (itemId) => {
  try {
    const bids = Bid.deleteMany({ itemId });
    return bids;
  } catch (err) {
    throw new ErrorResponse("An error ocurred when deleting bids", 500);
  }
};

export const findMaxBidByItem = async (itemId) => {
  try {
    const bids = await Bid.find({ itemId }, "-__v  -updatedAt")
      .sort({
        amount: -1,
      })
      .limit(1)
      .exec();

    return bids[0];
  } catch (err) {
    throw new ErrorResponse("An error ocurred", 500);
  }
};
