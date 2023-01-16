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

export const findAllItemsWithPagination = async (currentPage, perPage) => {
  try {
    var page = Math.max(0, currentPage);
    const items = await Item.find()
      .limit(perPage)
      .skip(perPage * page)
      .sort({
        createdAt: "desc",
      })
      .exec();

    const count = await Item.count().exec();

    return {
      items,
      page: page,
      pages: count / perPage,
    };
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

export const updateItem = async (id, updates) => {
  try {
    const item = Item.findOneAndUpdate({ _id: id }, updates, {
      new: true,
    });
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

export const deleteItemBySlug = async (slug) => {
  try {
    const item = Item.deleteOne({ slug });
    return item;
  } catch (err) {
    throw new ErrorResponse("An error ocurred when deleting the item", 500);
  }
};

export const findItemsBySearch = async (q) => {
  try {
    const items = Item.find({
      $or: [
        { title: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
      ],
    });
    return items;
  } catch (err) {
    throw new ErrorResponse("An error ocurred when fetching the items", 500);
  }
};
