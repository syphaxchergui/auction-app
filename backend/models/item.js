import mongoose from "mongoose";

const itemSchema = mongoose.Schema(
  {
    title: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    slug: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    expirationDate: {
      type: mongoose.Schema.Types.Date,
      required: true,
    },
    minBid: {
      type: mongoose.Schema.Types.Number,
      required: true,
      default: 1,
    },
    description: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    image: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Item = mongoose.model("Item", itemSchema);
