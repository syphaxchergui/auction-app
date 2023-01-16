import ErrorResponse from "../../utils/errorResponse.js";
import {
  createAutobid,
  deleteAutobid,
  findAutobid,
  findItemAutobids,
} from "./service.js";

export const getItemAutobids = async (req, res, next) => {
  try {
    const autobids = await findItemAutobids(req.params.itemId);

    if (!autobids) throw new ErrorResponse("No autobids found", 404);

    return res.status(200).json({
      success: true,
      message: "Autobids for Item",
      autobids,
    });
  } catch (err) {
    next(err);
  }
};

export const getUserAutobids = async (req, res, next) => {
  try {
    const autobids = await findItemAutobids(req.params.userId);

    if (!autobids) throw new ErrorResponse("No autobids found", 404);

    return res.status(200).json({
      success: true,
      message: "Autobids for user",
      autobids,
    });
  } catch (err) {
    next(err);
  }
};

export const getAutobid = async (req, res, next) => {
  try {
    const autobid = await findAutobid(req.params.itemId, req.params.userId);

    if (!autobid) throw new ErrorResponse("No autobid found", 404);

    return res.status(200).json({
      success: true,
      message: "Autobid by id",
      autobid,
    });
  } catch (err) {
    next(err);
  }
};

export const addAutobid = async (req, res, next) => {
  try {
    const autobid = await findAutobid(req.body.itemId, req.body.userId);

    if (autobid) {
      return new ErrorResponse("Autobid already activated", 409);
    }

    const newAutobid = await createAutobid(req.body.itemId, req.body.userId);

    return res.status(200).json({
      success: true,
      message: "Autobidding activated successfully !",
      autobid: newAutobid,
    });
  } catch (err) {
    next(err);
  }
};

export const removeAutobid = async (req, res, next) => {
  try {
    const autobid = await findAutobid(req.params.itemId, req.params.userId);

    if (!autobid) {
      return new ErrorResponse("no autobid found", 404);
    }

    const deletedAutobid = await deleteAutobid(
      req.params.itemId,
      req.params.userId
    );

    return res.status(200).json({
      success: true,
      message: "Autobidding deactivated successfully !",
      autobid: deletedAutobid,
    });
  } catch (err) {
    next(err);
  }
};
