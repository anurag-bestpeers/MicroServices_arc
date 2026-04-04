import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import restaurantRoute from "./routes/restaurant";
dotenv.config();
const app = express();

app.use("/api/reaturant", restaurantRoute);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Restaurant service is running on port ${PORT}`);
  connectDB();
});
