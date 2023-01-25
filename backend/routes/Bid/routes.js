import express from "express";
import { errorHandler } from "../../middlewares/error.js";
import { ValidationSource, validate } from "../../utils/validate.js";
import {
  addNewBid,
  getAllBidsUserProduct,
  getAllBidsProduct,
  autobidding,
  getAllBidsUser,
} from "./controller.js";
import {
  addBidSchema,
  getAllBidsProductSchema,
  getAllBidsUserProductSchema,
  getAllBidsUserSchema,
} from "./schema.js";

const router = express.Router();

router.get(
  "/:itemId",
  validate(getAllBidsProductSchema, ValidationSource.PARAMS),
  getAllBidsProduct,
  errorHandler
);

router.get(
  "/all/:userId",
  validate(getAllBidsUserSchema, ValidationSource.PARAMS),
  getAllBidsUser,
  errorHandler
);

router.get(
  "/:userId/:itemId",
  validate(getAllBidsUserProductSchema, ValidationSource.PARAMS),
  getAllBidsUserProduct,
  errorHandler
);
router.post(
  "/",
  validate(addBidSchema, ValidationSource.BODY),
  addNewBid,
  autobidding,
  errorHandler
);

export default router;
