import { Item } from "../../models/item.js";
import ErrorResponse from "../../utils/errorResponse.js";

export const findAllItems = async () => {
  try {
    const items = Item.find({}, "-__v -createdAt -updatedAt");
    return items;
  } catch (err) {
    throw new ErrorResponse("Server Error", 500);
  }
};

export const findItemById = async (id) => {
  try {
    const item = Item.findById(id, "-__v -createdAt -updatedAt");
    return item;
  } catch (err) {
    throw new ErrorResponse("Server Error", 500);
  }
};

export const findItemBySlug = async (slug) => {
  try {
    const item = Item.findOne({ slug: slug }, "-__v -createdAt -updatedAt");
    return item;
  } catch (err) {
    throw new ErrorResponse("Server Error", 500);
  }
};

export const createItem = async (
  title,
  slug,
  expirationDate,
  minBid,
  description,
  image
) => {
  try {
    const item = Item.create({
      title,
      slug,
      expirationDate,
      minBid,
      description,
      image,
    });
    return item;
  } catch (err) {
    throw new ErrorResponse("An error ocurred when creating the item", 500);
  }
};

export const deleteItem = async (id) => {
  try {
    const item = Item.deleteOne({ _id: id });
    return item;
  } catch (err) {
    throw new ErrorResponse("An error ocurred when deleting the item", 500);
  }
};
