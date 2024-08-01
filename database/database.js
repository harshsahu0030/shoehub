import mongoose from "mongoose";

export const connectDatabase = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB connect successfully ${db.connection.host}`);
  } catch (error) {
    console.log(`MongoDb Error : ${error}`);
    process.exit(1);
  }
};
