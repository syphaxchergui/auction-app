import { users } from "../../data/users.js";
import { Bid } from "../../models/bid.js";
import ErrorResponse from "../../utils/errorResponse.js";
import { STATUSES } from "../../utils/status.js";

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

export const findBidUserAsItems = async (user) => {
  try {
    const bids = await Bid.aggregate([
      {
        $match: {
          userId: +user,
        },
      },
      {
        $group: {
          _id: "$itemId",
          userLatestBidDate: { $max: "$createdAt" },
          userLatestBid: { $max: "$amount" },
        },
      },
      {
        $lookup: {
          from: "items",
          localField: "_id",
          foreignField: "_id",
          as: "item",
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [{ $arrayElemAt: ["$item", 0] }, "$$ROOT"],
          },
        },
      },
      { $project: { item: 0 } },
      { $sort: { userLatestBidDate: -1 } },
    ]);

    return bids;
  } catch (err) {
    throw new ErrorResponse("Server Error", 500);
  }
};

export const findBidItemAsUsers = async (itemId) => {
  try {
    const users = await Bid.aggregate([
      {
        $match: {
          itemId: itemId,
        },
      },
      {
        $group: {
          _id: "$userId",
        },
      },
    ]);
    console.log(users);
    return users;
  } catch (err) {
    throw new ErrorResponse("Server Error", 500);
  }
};

export const addStatusToBids = async (result) => {
  const now = new Date();
  const promises = result?.map(async (item) => {
    const maxBid = await findMaxBidByItem(item._id);

    if (new Date(item.expirationDate) > now) {
      return {
        ...item,
        status: STATUSES.inProgress,
        highestBid: maxBid?.amount,
      };
    }

    if (item.userLatestBid === maxBid.amount) {
      return {
        ...item,
        status: STATUSES.won,
        highestBid: maxBid?.amount,
      };
    } else {
      return {
        ...item,
        status: STATUSES.lost,
        highestBid: maxBid?.amount,
      };
    }
  });

  return Promise.all(promises);
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

    let lastBidders;

    if (bids.length > 0) {
      lastBidders = users.data.filter((u) => {
        if (u.id === bids[0].userId) return u;
      });
      return {
        ...bids[0]._doc,
        lastBidder: lastBidders[0]?.fullname,
        lastBidderEmail: lastBidders[0]?.email,
      };
    }

    return bids[0];
  } catch (err) {
    throw new ErrorResponse("An error ocurred", 500);
  }
};
