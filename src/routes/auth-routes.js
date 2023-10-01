import express from "express";
import { registerUser, verifyEmail } from "../controllers/auth-controller.js";
const userRouter = express.Router();
import passport from "passport";

userRouter.post("/register", registerUser);
userRouter.post("/login", (req, res) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    return res.status(200).json({
      userId: user._id,
      username: user.username,
      email: user.email,
      token: user.verificationToken,
    });
  })(req, res);
});
userRouter.get("/verify/:token", verifyEmail);
export default userRouter;
