import { AutoBid } from "../../models/autoBid.js";
import ErrorResponse from "../../utils/errorResponse.js";

export const findItemAutobids = async (itemId) => {
  try {
    const autobids = AutoBid.find({ itemId }, "-__v  -updatedAt").sort({
      createdAt: "asc",
    });
    return autobids;
  } catch (err) {
    throw new ErrorResponse("Server Error", 500);
  }
};

export const findUserAutobids = async (userId) => {
  try {
    const autobids = AutoBid.find({ userId }, "-__v  -updatedAt").populate(
      "userId"
    );
    return autobids;
  } catch (err) {
    throw new ErrorResponse("Server Error", 500);
  }
};

export const findAutobid = async (itemId, userId) => {
  try {
    const autobid = AutoBid.findOne({ itemId, userId }, "-__v  -updatedAt");
    return autobid;
  } catch (err) {
    throw new ErrorResponse("Server Error", 500);
  }
};

export const createAutobid = async (itemId, userId) => {
  try {
    const autobid = AutoBid.create({
      userId,
      itemId,
    });
    return autobid;
  } catch (err) {
    throw new ErrorResponse(
      "An error ocurred when creating the autobidding",
      500
    );
  }
};

export const deleteAutobid = async (itemId, userId) => {
  try {
    const autobid = AutoBid.deleteOne({ userId, itemId });
    return autobid;
  } catch (err) {
    throw new ErrorResponse("An error ocurred when deleting the autobid", 500);
  }
};

export const deleteAutobidsByItem = async (itemId) => {
  try {
    const autobids = AutoBid.deleteMany({ itemId });
    return autobids;
  } catch (err) {
    throw new ErrorResponse("An error ocurred when deleting the autobids", 500);
  }
};
