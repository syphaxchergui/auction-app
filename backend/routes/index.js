import express from "express";
import ItemRouter from "./Item/routes.js";

const router = express.Router();

router.use("/items", ItemRouter);

export default router;
