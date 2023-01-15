import express from "express";
import { uploadItemImage } from "../../core/multer.js";
import { errorHandler } from "../../middlewares/error.js";
import {
  addNewItem,
  getAllItems,
  getItemBySlug,
  removeItemBySlug,
  updateItemBySlug,
  searchItems,
} from "./controller.js";
import { ValidationSource, validate } from "../../utils/validate.js";
import {
  addItemSchema,
  deleteItemSlugSchema,
  getItemSlugSchema,
  getItemsSchema,
  searchItemsSchema,
} from "./schema.js";

const router = express.Router();

router.get(
  "/",
  validate(getItemsSchema, ValidationSource.QUERY),
  getAllItems,
  errorHandler
);

router.get(
  "/search",
  validate(searchItemsSchema, ValidationSource.QUERY),
  searchItems,
  errorHandler
);

router.get(
  "/:slug",
  validate(getItemSlugSchema, ValidationSource.PARAMS),
  getItemBySlug,
  errorHandler
);

router.put(
  "/:slug",
  validate(getItemSlugSchema, ValidationSource.PARAMS),
  updateItemBySlug,
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
