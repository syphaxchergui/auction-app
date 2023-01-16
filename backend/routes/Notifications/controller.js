import webpush from "web-push";
import dotenv from "dotenv";
import { findUserParams, updateUserParams } from "../UserParams/service.js";

dotenv.config();

const publicVapidKey = process.env.VAPID_PUBLIC_KEY;
const privateVapidKey = process.env.VAPID_PRIVATE_KEY;

webpush.setVapidDetails(
  "mailto:test@test.com",
  publicVapidKey,
  privateVapidKey
);

export const saveSubscription = async (req, res, next) => {
  try {
    const { subscription, userId } = req.body;
    const userParams = await updateUserParams(userId, {
      subscription: JSON.stringify(subscription),
    });

    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};

export const sendNotification = async (userId, title, message) => {
  const userParams = await findUserParams(userId);
  const payload = JSON.stringify({ title, message });
  webpush
    .sendNotification(JSON.parse(userParams?.subscription), payload)
    .catch((err) => console.error("err", err));
};
