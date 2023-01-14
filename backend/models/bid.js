import mongoose from "mongoose";

const bidSchema = mongoose.Schema(
  {
    amount: {
      type: mongoose.Schema.Types.Number,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.Number,
      required: true,
    },
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Bid = mongoose.model("Bid", bidSchema);
