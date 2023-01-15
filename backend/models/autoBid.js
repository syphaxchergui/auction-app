import mongoose from "mongoose";

const autoBidSchema = mongoose.Schema(
  {
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

export const AutoBid = mongoose.model("AutoBid", autoBidSchema);
