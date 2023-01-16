import e from "express";
import ErrorResponse from "../../utils/errorResponse.js";
import { findItemAutobids } from "../AutoBid/service.js";
import { sendNotification } from "../Notifications/controller.js";
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

    let autobid;

    //if the autobidding stops after each one of the users that activated the autobidding
    //for an item made one auto bid we use the commented code below

    // Start
    // for (let i = 0; i < autobids.length; i++) {
    //   autobid = autobids[i];

    //   const userParams = await findUserParams(autobid.userId);
    //   const highestBid = await findMaxBidByItem(itemId);
    //   const reservedAmontAfterBidding =
    //     (userParams?.reservedAmount || 0) + highestBid.amount + 1;
    //   const maxBidAmount = userParams?.maxBidAmount;

    //   if (
    //     autobid.userId !== highestBid.userId &&
    //     reservedAmontAfterBidding <= maxBidAmount
    //   ) {
    //     const bid = await createBid(
    //       autobid.userId,
    //       itemId,
    //       highestBid.amount + 1
    //     );

    //     if (bid) {
    //     }
    //   }
    // }
    // END

    //else if the autobidding stops after the users don't have enough reserve we use the code below
    let stop = false;

    while (!stop) {
      for (let i = 0; i < autobids.length; i++) {
        autobid = autobids[i];

        const userParams = await findUserParams(autobid.userId);
        const highestBid = await findMaxBidByItem(itemId);
        const reservedAmontAfterBidding =
          (userParams?.reservedAmount || 0) + highestBid.amount + 1;
        const maxBidAmount = userParams?.maxBidAmount;

        //send notification of the max bid amount is reached
        if (userParams?.maxBidAmount == userParams?.reservedAmount)
          sendNotification(
            highestBid.userId,
            "Max Bid amount is reached !",
            `You've reached 100% of your maximum bid amount`
          );

        if (
          autobid.userId !== highestBid.userId &&
          reservedAmontAfterBidding <= maxBidAmount
        ) {
          stop = false;
          const bid = await createBid(
            autobid.userId,
            itemId,
            highestBid.amount + 1
          );

          if (bid) {
          }
        } else {
          stop = true;
        }
      }
    }

    //get highest bidder and update his reserved amount
    const highestBid = await findMaxBidByItem(itemId);
    const userParams = await findUserParams(highestBid.userId);
    const updatedUserParams = await updateUserParams(highestBid.userId, {
      reservedAmount: (userParams?.reservedAmount || 0) + highestBid.amount,
    });

    //send notification if alert bid condition is met

    if (
      (updatedUserParams?.alertBid / 100) * updatedUserParams?.maxBidAmount >=
      updatedUserParams?.reservedAmount
    )
      sendNotification(
        highestBid.userId,
        "Alert Bid !",
        `You've reached ${updatedUserParams?.alertBid}% of your maximum bid amount`
      );
  } catch (err) {
    next(err);
  }
};
