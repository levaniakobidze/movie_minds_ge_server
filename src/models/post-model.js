import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    post_author: {
      type: String,
      required: true,
    },
    poster: {
      type: String,
      required: true,
    },
    genre: {
      type: [String],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    likes: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);
const Post = mongoose.model("Post", PostSchema);
export default Post;
