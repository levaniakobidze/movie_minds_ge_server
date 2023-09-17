import express from "express";
import {
  createPost,
  getAllUsers,
  getPosts,
} from "../controllers/user-controller.js";

const router = express.Router();

router.get("/allUsers", getAllUsers);
router.get("/posts", getPosts);
router.post("/addPost", createPost);

export default router;
