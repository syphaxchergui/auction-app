import mongoose from "mongoose";

const userParamsSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.Number,
      required: true,
    },
    maxBidAmount: {
      type: mongoose.Schema.Types.Number,
      required: true,
    },
    alertBid: {
      type: mongoose.Schema.Types.Number,
      required: true,
    },
    reservedAmount: {
      type: mongoose.Schema.Types.Number,
      required: true,
      default: 0,
    },
    subscription: {
      type: mongoose.Schema.Types.String,
    },
  },
  {
    timestamps: true,
  }
);

export const UserParams = mongoose.model("UserParams", userParamsSchema);
