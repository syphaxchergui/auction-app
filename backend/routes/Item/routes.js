import express from "express";
import { uploadItemImage } from "../../core/multer.js";
import { errorHandler } from "../../middlewares/error.js";
import { addNewItem, getAllItems, getItemBySlug } from "./controller.js";
import { ValidationSource, validate } from "../../utils/validate.js";
import { addItemSchema, getItemSlugSchema } from "./schema.js";

const router = express.Router();

router.get("/", getAllItems, errorHandler);
router.get(
  "/:slug",
  validate(getItemSlugSchema, ValidationSource.PARAMS),
  getItemBySlug,
  errorHandler
);
router.post(
  "/",
  uploadItemImage.single("image"),
  validate(addItemSchema, ValidationSource.BODY),
  addNewItem,
  errorHandler
);

export default router;
