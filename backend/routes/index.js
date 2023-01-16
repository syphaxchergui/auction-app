import express from "express";
import ItemRouter from "./Item/routes.js";
import AuthRoutes from "./Auth/routes.js";
import BidRouter from "./Bid/routes.js";
import UserParamsRouter from "./UserParams/routes.js";
import AutobidRouter from "./AutoBid/routes.js";
import NotificationRouter from "./Notifications/routes.js";

const router = express.Router();

router.use("/auth", AuthRoutes);
router.use("/items", ItemRouter);
router.use("/bids", BidRouter);
router.use("/autobids", AutobidRouter);
router.use("/user-params", UserParamsRouter);
router.use("/notifications", NotificationRouter);

export default router;
