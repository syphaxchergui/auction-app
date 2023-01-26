import dotenv from "dotenv";
import { createTransport } from "nodemailer";
dotenv.config();

let transporter = createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

//for authentification issues
//https://community.nodemailer.com/using-gmail/
export const sendEmail = (email, obj, msg) => {
  let mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: email,
    subject: obj,
    text: msg,
  };

  // Delivering mail with sendMail method
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) console.log(error);
    else console.log("Email sent: " + info.response);
  });
};
