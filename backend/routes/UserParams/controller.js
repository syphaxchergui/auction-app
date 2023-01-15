import ErrorResponse from "../../utils/errorResponse.js";
import {
  findUserParams,
  createUserParams,
  updateUserParams,
} from "./service.js";

export const getUserParams = async (req, res, next) => {
  try {
    const userParams = await findUserParams(req.params.userId);

    if (!userParams) throw new ErrorResponse("No user params found", 404);

    return res.status(200).json({
      success: true,
      message: "User params",
      userParams,
    });
  } catch (err) {
    next(err);
  }
};

export const addNewUserParams = async (req, res, next) => {
  try {
    const userParams = await findUserParams(req.body.userId);

    if (userParams) {
      return new ErrorResponse("User params already created", 409);
    }

    const newUserParams = await createUserParams(
      req.body.userId,
      req.body.maxBidAmount,
      req.body.alertBid
    );

    return res.status(200).json({
      success: true,
      message: "User Params created successfully",
      newUserParams,
    });
  } catch (err) {
    next(err);
  }
};

export const modifyUserParams = async (req, res, next) => {
  try {
    const userParams = await findUserParams(req.params.userId);

    if (!userParams) {
      return new ErrorResponse("No User params found", 404);
    }

    const newUserParams = await updateUserParams(req.params.userId, req.body);

    return res.status(200).json({
      success: true,
      message: "User Params updated successfully",
      newUserParams,
    });
  } catch (err) {
    next(err);
  }
};
