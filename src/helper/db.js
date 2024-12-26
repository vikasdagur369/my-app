import mongoose from "mongoose";
export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      dbName: "college",
    });

    console.log("db connected!");
  } catch (error) {
    console.log(error);
  }
};
