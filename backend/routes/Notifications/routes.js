import express from "express";

import { errorHandler } from "../../middlewares/error.js";
import { saveSubscription } from "./controller.js";

const router = express.Router();

router.post("/subscribe", saveSubscription, errorHandler);

export default router;
