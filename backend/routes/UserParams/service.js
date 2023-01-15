import { UserParams } from "../../models/userParams.js";
import ErrorResponse from "../../utils/errorResponse.js";

export const findUserParams = async (userId) => {
  try {
    const userParams = UserParams.findOne({ userId }, "-__v  -updatedAt");
    return userParams;
  } catch (err) {
    throw new ErrorResponse("Server Error", 500);
  }
};

export const createUserParams = async (userId, maxBidAmount, alertBid) => {
  try {
    const userParams = UserParams.create({
      userId,
      maxBidAmount,
      alertBid,
    });
    return userParams;
  } catch (err) {
    throw new ErrorResponse(
      "An error ocurred when creating the user's parameters",
      500
    );
  }
};

export const updateUserParams = async (userId, updates) => {
  try {
    const userParams = UserParams.findOneAndUpdate({ userId }, updates, {
      new: true,
    });
    return userParams;
  } catch (err) {
    throw new ErrorResponse(
      "An error ocurred when updating the user's parameters",
      500
    );
  }
};
