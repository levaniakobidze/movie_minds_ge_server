import express from "express";
import {
  registerUser,
  loginUser,
  verifyEmail,
} from "../controllers/auth-controller.js";
const userRouter = express.Router();
import passport from "passport";

userRouter.post("/register", registerUser);
userRouter.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "http://localhost:3000",
    failureRedirect: "http://localhost:3000",
    failureFlash: true,
  })
);
userRouter.get("/verify/:token", verifyEmail);
export default userRouter;
