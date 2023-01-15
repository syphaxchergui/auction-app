import express from "express";
import ItemRouter from "./Item/routes.js";
import AuthRoutes from "./Auth/routes.js";
import BidRouter from "./Bid/routes.js";
import UserParamsRouter from "./UserParams/routes.js";

const router = express.Router();

router.use("/auth", AuthRoutes);
router.use("/items", ItemRouter);
router.use("/bids", BidRouter);
router.use("/user-params", UserParamsRouter);

export default router;
