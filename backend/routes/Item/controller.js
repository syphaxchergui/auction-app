import ErrorResponse from "../../utils/errorResponse.js";
import {
  createItem,
  findAllItems,
  findAllItemsWithPagination,
  findItemBySlug,
  deleteItemBySlug,
  updateItem,
  findItemsBySearch,
  findItemById,
} from "./service.js";
import cloudinary from "../../core/cloudinary.js";
import slug from "slug";
import { deleteBidsByItem, findMaxBidByItem } from "../Bid/service.js";
import { deleteAutobidsByItem, findAutobid } from "../AutoBid/service.js";
import { io } from "../../server.js";
import { closedBidJob, updateClosedBidJob } from "../../jobs/closedBidJob.js";
import { scheduledJobs } from "node-schedule";

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

    const maxBid = await findMaxBidByItem(item._id);

    var autobidding;

    if (req.query.userId) {
      const autobid = await findAutobid(item._id, req.query.userId);
      if (autobid) {
        autobidding = true;
      } else {
        autobidding = false;
      }
    }

    return res.status(200).json({
      success: true,
      message: "Item by slug",
      item,
      maxBid,
      autobidding,
    });
  } catch (err) {
    next(err);
  }
};

export const getItemById = async (req, res, next) => {
  try {
    if (!req.params.itemId) {
      throw new ErrorResponse("itemId not valid", 422);
    }
    const item = await findItemById(req.params.itemId);
    if (!item)
      throw new ErrorResponse(
        `No item with id ${req.params.itemId} found`,
        404
      );

    const maxBid = await findMaxBidByItem(item._id);

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

export const updateItemBySlug = async (req, res, next) => {
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

    const newItem = await updateItem(item._id, req.body);

    if (req.body?.expirationDate)
      updateClosedBidJob(newItem.slug, newItem.expirationDate, {
        title: newItem.title,
        itemId: newItem._id,
      });

    return res.status(200).json({
      success: true,
      message: "Item updated",
      newItem,
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

    closedBidJob(item?.slug, req.body.expirationDate, {
      title: req.body.title,
      itemId: item?._id,
    });

    return res.status(200).json({
      success: true,
      message: "Item created successfully",
      item,
    });
  } catch (err) {
    next(err);
  }
};

export const searchItems = async (req, res, next) => {
  try {
    const items = await findItemsBySearch(req.query.q);
    if (!items || items.length === 0)
      throw new ErrorResponse("No items found", 404);
    return res.status(200).json({
      success: true,
      message: "Items list",
      items,
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
    const deletedBids = await deleteBidsByItem(item._id);
    const deletedAutobids = await deleteAutobidsByItem(item._id);

    return res.status(200).json({
      success: true,
      message: "Item deleted !",
      deletedItem,
    });
  } catch (err) {
    next(err);
  }
};
