import Post from "../models/post-model.js";
import User from "../models/user-model.js";

export const getAllUsers = async (req, res) => {
  const users = await User.find();
  if (!users) {
    return res.status(401).json({ status: 401, message: "No users found!" });
  }

  return res.status(200).json(users);
};

export const getPosts = async (req, res) => {
  const posts = await Post.find();
  if (!posts) {
    return res.status(401).json({ status: 401, message: "No posts found!" });
  }

  return res.status(200).json(posts);
};

export const createPost = async (req, res) => {
  const { user_id, post_author, poster, title, genre, content } = req.body;
  const newPost = new Post({
    user_id,
    post_author,
    poster,
    genre,
    title,
    content,
  });

  try {
    await newPost.save();
    res.status(201).json({ status: 201, message: "Post added!" });
  } catch (error) {
    res.status(501).json(error);
  }
};
