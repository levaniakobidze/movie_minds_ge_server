import User from "../models/user-model.js";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400).send("User already exists with this email");
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
        pass: "Helloworldfromgeorgia",
      },
    });
    const mailOptions = {
      from: "levaniakobidze25@gmail.com",
      to: email,
      subject: "დაადასტირეთ ელ.ფოსტა",
      text: `ელ.ფოსტის დასადასტურებლად გადადით მოცემულ ლინკზე: http://localhost:8000/verify/${verificationToken}`,
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

export const loginUser = (req, res) => {
  res.send("Login");
};
