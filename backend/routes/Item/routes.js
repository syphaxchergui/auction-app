import express from "express";
import { errorHandler } from "../../middlewares/error.js";

const router = express.Router();

router.get(
  "/",
  (req, res) => {
    res.send("Test");
  },
  errorHandler
);

export default router;
