import ErrorResponse from "../../utils/errorResponse.js";
import { findItemAutobids } from "../AutoBid/service.js";
import { findUserParams, updateUserParams } from "../UserParams/service.js";
import {
  createBid,
  findBidUserProduct,
  findBidProduct,
  findMaxBidByItem,
} from "./service.js";

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

export const getAllBidsProduct = async (req, res, next) => {
  try {
    const bids = await findBidProduct(req.params.itemId);
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

    res.status(200).json({
      success: true,
      message: "Bid created successfully",
      bid,
    });

    //call the autobidding function
    next();
  } catch (err) {
    next(err);
  }
};

export const autobidding = async (req, res, next) => {
  try {
    const { itemId, userId } = req.body;
    //Auto Bid feature
    //First we get all autobids we have on the Item
    const autobids = await findItemAutobids(itemId);

    if (!autobids) {
      return;
    }

    //We loop through the autobids array
    //check if the user is not the highest bider
    //check if the user has enough amount to oubid the highest bidder
    //create the bid with highestBid + 1
    //update the user params reservedAmout = reservedAmount - highestBid + 1
    //if(alertBid) send notification to the user

    //We get the highest bid
    console.log(autobids);

    let autobid;
    for (let i = 0; i < autobids.length; i++) {
      autobid = autobids[i];
      const userParams = await findUserParams(autobid.userId);
      const highestBid = await findMaxBidByItem(itemId);

      if (autobid.userId !== highestBid.userId) {
        const bid = await createBid(
          autobid.userId,
          itemId,
          highestBid.amount + 1
        );

        console.log("auto bid created: ", bid);
        if (bid) {
          const updatedUserParams = await updateUserParams(userId, {
            reservedAmount:
              (userParams?.reservedAmount || 0) + highestBid.amount + 1,
          });
          console.log("updated user params: ", updatedUserParams);
        }
      }
    }

    // autobids.map(async (autobid) => {
    //   const userParams = await findUserParams(autobid.userId);
    //   const highestBid = await findMaxBidByItem(itemId);

    //   if (autobid.userId !== highestBid.userId) {
    //     const bid = await createBid(
    //       autobid.userId,
    //       itemId,
    //       highestBid.amount + 1
    //     );

    //     console.log("auto bid created: ", bid);
    //     if (bid) {
    //       const updatedUserParams = await updateUserParams(userId, {
    //         reservedAmount:
    //           (userParams?.reservedAmount || 0) + highestBid.amount + 1,
    //       });
    //       console.log("updated user params: ", updatedUserParams);
    //     }
    //   }
    // });
  } catch (err) {
    next(err);
  }
};
