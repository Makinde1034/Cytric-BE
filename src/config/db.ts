import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = (callback: (db: mongoose.Connection) => void): void => {
  mongoose.set("strictQuery", false);

  mongoose
    .connect(process.env.DB as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    } as mongoose.ConnectOptions)
    .then(() => console.log(`Connected to DB -> ${process.env.DB}`))
    .catch((error) => console.error("Database connection error: " + error.message));

  const db = mongoose.connection;

  db.on("error", (error) => {
    console.error("Database connection error: " + error.message);
  });

  callback(db);
};

export default connectDB;
