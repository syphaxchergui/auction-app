import express from "express";
import { errorHandler } from "../../middlewares/error.js";
import { ValidationSource, validate } from "../../utils/validate.js";
import { login } from "./controller.js";
import { loginSchema } from "./schema.js";

const router = express.Router();

router.post(
  "/login",
  validate(loginSchema, ValidationSource.BODY),
  login,
  errorHandler
);

export default router;
