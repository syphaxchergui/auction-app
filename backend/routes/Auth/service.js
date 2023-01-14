import { users } from "../../data/users.js";
import ErrorResponse from "../../utils/errorResponse.js";

export const findUserByEmail = (email) => {
  try {
    var user = null;
    user = users.data.filter((u) => {
      if (u.email === email) return { user: u };
    });

    if (!user.length) return null;
    return user[0];
  } catch (err) {
    throw new ErrorResponse("Server Error", 500);
  }
};
