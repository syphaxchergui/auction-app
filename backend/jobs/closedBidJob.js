import { scheduledJobs, scheduleJob } from "node-schedule";
import { sendEmail } from "../core/email.js";
import { users } from "../data/users.js";
import { findBidItemAsUsers, findMaxBidByItem } from "../routes/Bid/service.js";
import { io } from "../server.js";

export const closedBidJob = (name, date, data) => {
  scheduleJob(name, new Date(date), () => {
    jobCb(data);
  });
};

export const updateClosedBidJob = (name, date, data) => {
  const job = scheduledJobs[name];

  if (job) job.cancel();
  scheduleJob(name, new Date(date), () => {
    jobCb(data);
  });
};

const jobCb = async (data) => {
  const maxBid = await findMaxBidByItem(data?.itemId);
  let message;
  if (maxBid) {
    message =
      "Bid for item " +
      data.title +
      " is closed, Winner: " +
      maxBid?.lastBidder;
  } else {
    message = "Bid for item " + data.title + " is closed";
  }
  io.emit("bidClosed", { message, maxBid });

  //sendEmail to highest bidder
  sendEmail(
    maxBid?.lastBidderEmail,
    "Congratulations you won the auction !",
    `
Congratulations ${maxBid?.lastBidder}, you won the auction for the item: ${
      data.title
    }

Your Bill
Item: ${data.title}
Date: ${new Date(maxBid?.createdAt).toLocaleString()}
Amount: $${maxBid?.amount}

Thank you for using our app, see you soon !
  `
  );

  //get the list of user with bids on the item
  const usersBidsItem = await findBidItemAsUsers(data?.itemId);

  if (usersBidsItem)
    usersBidsItem?.map((uid) => {
      const user = users.data.find((user) => {
        return user.id == uid._id;
      });

      if (user?.email != maxBid?.lastBidderEmail) {
        sendEmail(
          user?.email,
          "Unfortunately, you lost the auction !",
          `
Unfortunately, ${maxBid?.lastBidder} won the auction for the item: ${data.title}
    
Date: ${new Date(maxBid?.createdAt).toLocaleString()}
Amount: $${maxBid?.amount}
        
Thank you for using our app, see you soon !
          `
        );
      }
    });
};
