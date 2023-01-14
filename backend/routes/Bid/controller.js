import ErrorResponse from "../../utils/errorResponse.js";
import { createBid, findBidUserProduct } from "./service.js";

export const getAllBidsUserProduct = async (req, res, next) => {
  try {
    const bids = await findBidUserProduct(req.params.userId, req.params.itemId);
    if (!bids || bids.length === 0)
      throw new ErrorResponse("No bids found", 404);
    return res.status(200).json({
      success: true,
      message: "Items list",
      bids,
    });
  } catch (err) {
    next(err);
  }
};

export const addNewBid = async (req, res, next) => {
  try {
    const bid = await createBid(
      req.body.userId,
      req.body.itemId,
      req.body.amount
    );

    return res.status(200).json({
      success: true,
      message: "Bid created successfully",
      bid,
    });
  } catch (err) {
    next(err);
  }
};
