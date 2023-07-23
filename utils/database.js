import mongoose from "mongoose";

let isConnected = false; // track the connection
// console.log(process.env.MONGODB_URI);
export const connectToDB = async () => {
  // mongoose.set("strictQuery", true);
  // mongoose.set("strict", "throw");

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }
  // console.log("isConnected test", isConnected);
  try {
    // console.log("isConnected in try 1", isConnected);

    await mongoose.connect(process.env.MONGODB_URI, {
      // dbName: "share_prompt",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;

    console.log("MongoDB connected");
    // console.log("isConnected in try 2", isConnected);
  } catch (error) {
    // console.log("isConnected in catch", isConnected);

    console.log("Error while connecting", error);
  }
};
