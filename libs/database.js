import mongoose from "mongoose";

const connect = () => {
  if (mongoose.connection.readyState > 0) {
    return new Promise((resolve) => resolve("already connected"));
  }

  try {
    const uri = process.env.MONGO_URI;
    mongoose.connect(uri, {
      dbName: process.env.DB_NAME,
    });

    return new Promise((resolve) => {
      resolve("connected");
    });
  } catch (error) {
    const message = error.message;
    return new Promise((reject) => {
      reject(`connection failed, ${message}`);
    });
  }
};

export default connect;
