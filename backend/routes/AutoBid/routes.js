import express from "express";
import { errorHandler } from "../../middlewares/error.js";
import { ValidationSource, validate } from "../../utils/validate.js";
import {
  addAutobid,
  getAutobid,
  getItemAutobids,
  getUserAutobids,
  removeAutobid,
} from "./controller.js";
import {
  addAutobidSchema,
  autobidSchema,
  getItemAutobidsSchema,
  getUserAutobidsSchema,
} from "./schema.js";

const router = express.Router();

router.get(
  "/user/:userId",
  validate(getUserAutobidsSchema, ValidationSource.PARAMS),
  getUserAutobids,
  errorHandler
);
router.get(
  "/item/:itemId",
  validate(getItemAutobidsSchema, ValidationSource.PARAMS),
  getItemAutobids,
  errorHandler
);
router.get(
  "/:userId/:itemId",
  validate(autobidSchema, ValidationSource.PARAMS),
  getAutobid,
  errorHandler
);

router.post(
  "/",
  validate(addAutobidSchema, ValidationSource.BODY),
  addAutobid,
  errorHandler
);

router.delete(
  "/:userId/:itemId",
  validate(autobidSchema, ValidationSource.PARAMS),
  removeAutobid,
  errorHandler
);

export default router;
