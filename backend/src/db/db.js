import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.DB_URI}`);
    console.log("connected to DB");
  } catch (error) {
    console.error("DB not connected");
  }
};

export default connectDB;
