import express from "express";
import { uploadItemImage } from "../../core/multer.js";
import { errorHandler } from "../../middlewares/error.js";
import {
  addNewItem,
  getAllItems,
  getItemBySlug,
  removeItemBySlug,
} from "./controller.js";
import { ValidationSource, validate } from "../../utils/validate.js";
import {
  addItemSchema,
  deleteItemSlugSchema,
  getItemSlugSchema,
  getItemsSchema,
} from "./schema.js";

const router = express.Router();

router.get(
  "/",
  validate(getItemsSchema, ValidationSource.QUERY),
  getAllItems,
  errorHandler
);
router.get(
  "/:slug",
  validate(getItemSlugSchema, ValidationSource.PARAMS),
  getItemBySlug,
  errorHandler
);

router.delete(
  "/:slug",
  validate(deleteItemSlugSchema, ValidationSource.PARAMS),
  removeItemBySlug,
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
