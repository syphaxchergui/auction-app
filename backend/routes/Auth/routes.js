import express from "express";
import { errorHandler } from "../../middlewares/error.js";
import { ValidationSource, validate } from "../../utils/validate.js";
import { login, logout } from "./controller.js";
import { loginSchema, logoutSchema } from "./schema.js";

const router = express.Router();

router.post(
  "/login",
  validate(loginSchema, ValidationSource.BODY),
  login,
  errorHandler
);

router.post(
  "/logout",
  validate(logoutSchema, ValidationSource.BODY),
  logout,
  errorHandler
);

export default router;
