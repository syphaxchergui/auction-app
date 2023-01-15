import express from "express";
import { errorHandler } from "../../middlewares/error.js";
import { ValidationSource, validate } from "../../utils/validate.js";
import {
  addNewUserParams,
  getUserParams,
  modifyUserParams,
} from "./controller.js";
import { addUserParamsSchema } from "./schema.js";

const router = express.Router();

router.get("/:userId", getUserParams, errorHandler);
router.post(
  "/",
  validate(addUserParamsSchema, ValidationSource.BODY),
  addNewUserParams,
  errorHandler
);

router.put("/:userId", modifyUserParams, errorHandler);

export default router;
