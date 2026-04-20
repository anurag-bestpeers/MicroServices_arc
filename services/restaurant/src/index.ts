import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import restaurantRoute from "./routes/restaurant";
import cors from "cors";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json())
app.use("/api/restaurant", restaurantRoute);



const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Restaurant service is running on port ${PORT}`);
  connectDB();
});
