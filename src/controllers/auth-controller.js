import User from "../models/user-model.js";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import passport from "passport";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).send("User already exists with this email");
    }
    const verificationToken = Math.random().toString(36).substring(7);

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword,
      verificationToken,
    });

    await user.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "levaniakobidze25@gmail.com",
        pass: "aexcjcmfhzwimtoe",
      },
    });
    const mailOptions = {
      from: "levaniakobidze25@gmail.com",
      to: email,
      subject: "დაადასტირეთ ელ.ფოსტა",
      text: `ელ.ფოსტის დასადასტურებლად გადადით მოცემულ ლინკზე: ${process.env.CLIENT_HOST_URL}/api/v1/user/verify/${verificationToken}`,
    };
    await transporter.sendMail(mailOptions);
    res
      .status(201)
      .send(
        "Registration successful. Check your email for verification instructions."
      );
  } catch (err) {
    console.log(err);
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const token = req.params.token;
    console.log(token);
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(404).send("Invalid verification token.");
    }

    user.verified = true;
    user.verificationToken = null;
    await user.save();
    user.save();
    res.send("Email verified successfully. You can now log in.");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

// export const loginUser = (req, res) => {
//   passport.authenticate("local", {
//     successRedirect: "http://localhost:3000",
//     failureRedirect: "http://localhost:3000",
//     failureFlash: true,
//   });
// };
