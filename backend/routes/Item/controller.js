import ErrorResponse from "../../utils/errorResponse.js";
import {
  createItem,
  findAllItems,
  findAllItemsWithPagination,
  findItemBySlug,
  deleteItemBySlug,
} from "./service.js";
import cloudinary from "../../core/cloudinary.js";
import { isValidObjectId } from "mongoose";
import slug from "slug";
import { findMaxBidByItem } from "../Bid/service.js";

export const getAllItems = async (req, res, next) => {
  try {
    const result = await findAllItemsWithPagination(
      req.query.page,
      req.query.limit
    );
    if (!result?.items || result?.items?.length === 0)
      throw new ErrorResponse("No items found", 404);
    return res.status(200).json({
      success: true,
      message: "Items list",
      items: result?.items,
      page: result?.page,
      pages: result?.pages,
    });
  } catch (err) {
    next(err);
  }
};

export const getItemBySlug = async (req, res, next) => {
  try {
    if (!req.params.slug) {
      throw new ErrorResponse("slug not valid", 422);
    }
    const item = await findItemBySlug(req.params.slug);
    if (!item)
      throw new ErrorResponse(
        `No item with slug ${req.params.slug} found`,
        404
      );

    const maxBidArray = await findMaxBidByItem(item._id);
    const maxBid = maxBidArray[0];
    return res.status(200).json({
      success: true,
      message: "Item by slug",
      item,
      maxBid,
    });
  } catch (err) {
    next(err);
  }
};

export const addNewItem = async (req, res, next) => {
  try {
    let result = await cloudinary.uploader.upload(req.file.path);
    const item = await createItem(
      req.body.title,
      slug(req.body.title + "-" + Math.floor(Date.now() / 1000)),
      req.body.expirationDate,
      req.body.minBid,
      req.body.description,
      result.url
    );

    return res.status(200).json({
      success: true,
      message: "Item created successfully",
      item,
    });
  } catch (err) {
    next(err);
  }
};

export const removeItemBySlug = async (req, res, next) => {
  try {
    if (!req.params.slug) {
      throw new ErrorResponse("slug not valid", 422);
    }
    const item = await findItemBySlug(req.params.slug);
    if (!item)
      throw new ErrorResponse(
        `No item with slug ${req.params.slug} found`,
        404
      );

    const deletedItem = await deleteItemBySlug(req.params.slug);

    return res.status(200).json({
      success: true,
      message: "Item deleted !",
      deletedItem,
    });
  } catch (err) {
    next(err);
  }
};
