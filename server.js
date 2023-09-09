import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./src/routes/auth-routes.js";
import connectMongo from "./src/config/mongo.js";
import swaggerMiddleware from "./src/middlewares/swagger-middleware.js";
import passport from "./src/config/passport-config.js";
import session from "express-session";
import flash from "connect-flash";
const server = express();

server.use(bodyParser.json());
server.use(cors());
dotenv.config();
// MongoDB connection
connectMongo();
// Session
server.use(
  session({
    secret: "mysecretkey",
    resave: false,
    saveUninitialized: true,
  })
);
// Passport initialization
server.use(passport.initialize());
server.use(passport.session());
// Set up connect-flash middleware
server.use(flash());

server.use("/api/v1/user/", userRouter);

server.use("/", ...swaggerMiddleware());

server.listen(8000, () => console.log("Server running on port 8000"));
