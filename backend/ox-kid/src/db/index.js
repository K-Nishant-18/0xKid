import mongoose from "mongoose";
import { db_name } from "../constance.js";

const connectDb = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/${db_name}`
    );

    console.log(
      `MONGODB CONNECTED DB HOST !! ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("mongodb connection error ");
  }
};

export { connectDb };
