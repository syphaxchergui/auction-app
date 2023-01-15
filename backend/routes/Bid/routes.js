import express from "express";
import { errorHandler } from "../../middlewares/error.js";
import { ValidationSource, validate } from "../../utils/validate.js";
import {
  addNewBid,
  getAllBidsUserProduct,
  getAllBidsProduct,
} from "./controller.js";
import { addBidSchema } from "./schema.js";

const router = express.Router();

router.get("/:itemId", getAllBidsProduct, errorHandler);
router.get("/:userId/:itemId", getAllBidsUserProduct, errorHandler);
router.post(
  "/",
  validate(addBidSchema, ValidationSource.BODY),
  addNewBid,
  errorHandler
);

export default router;
