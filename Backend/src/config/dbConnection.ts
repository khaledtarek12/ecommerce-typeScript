import mongoose from "mongoose";

const dbConnection = () => {
  mongoose.connect(process.env.DB_URL!).then(() => {
    console.log("Connected to MongoDB");
  });
};

export default dbConnection;
