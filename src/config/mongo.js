import mongoose from "mongoose";

const connectMongo = () => {
  try {
    return mongoose
      .connect(process.env.MONGO_URL)
      .then(() => console.log("mongoDB running ... ... ..."));
  } catch (err) {
    console.log(err);
    return err;
  }
};

export default connectMongo;
