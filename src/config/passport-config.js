import passport from "passport";
import bcrypt from "bcrypt";
import User from "../models/user-model.js";
import localStrategy from "passport-local";

const passportConfig = passport.use(
  "local",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        // Find if user exists
        const user = await User.findOne({ email });

        // If doesn't exist, then ...
        if (!user) {
          return done(null, false, { message: "Incorrect email !" });
        }
        // If exists but email is not verified, then ...
        if (!user.verified) {
          return done(null, false, {
            message:
              "Email not verified. Check your inbox for verification instructions.",
          });
        }

        // Checking if password is correct
        const passwordMatch = await bcrypt.compare(password, user.password);
        // If it's not correct, then ...
        if (!passwordMatch) {
          return done(null, false, { message: "Incorrect password." });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id);
});

export default passportConfig;
