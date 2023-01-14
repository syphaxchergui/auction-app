import { findUserByEmail } from "./service.js";
import ErrorResponse from "../../utils/errorResponse.js";

export const login = (req, res, next) => {
  try {
    const user = findUserByEmail(req.body.email);
    if (!user) {
      throw new ErrorResponse("No user", 404);
    }

    const match = req.body.password === user.password;
    if (!match) {
      throw new ErrorResponse("Wrong password !", 400);
    }

    return res.status(200).json({
      success: true,
      message: "You are successfully logged in",
      token: user.token,
      user,
    });
  } catch (err) {
    next(err);
  }
};
