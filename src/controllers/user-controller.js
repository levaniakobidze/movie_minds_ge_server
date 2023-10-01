import Post from "../models/post-model.js";
import User from "../models/user-model.js";

export const getAllUsers = async (req, res) => {
  const users = await User.find();
  if (!users) {
    return res.status(401).json({ status: 401, message: "No users found!" });
  }

  return res.status(200).json(users);
};
