import express from "express";
import { errorHandler } from "../../middlewares/error.js";
import { ValidationSource, validate } from "../../utils/validate.js";
import { addNewBid, getAllBidsUserProduct } from "./controller.js";

const router = express.Router();

router.get("/:userId/:itemId", getAllBidsUserProduct, errorHandler);
router.post("/", addNewBid, errorHandler);

export default router;
