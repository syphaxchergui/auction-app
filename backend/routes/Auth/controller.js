import { findUserByEmail } from "./service.js";
import ErrorResponse from "../../utils/errorResponse.js";
import { updateUserParams } from "../UserParams/service.js";

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
      user: {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  try {
    const userParams = await updateUserParams(req.body.userId, {
      subscription: "",
    });

    return res.status(200).json({
      success: true,
      message: "You are successfully logged out",
    });
  } catch (err) {
    next(err);
  }
};
