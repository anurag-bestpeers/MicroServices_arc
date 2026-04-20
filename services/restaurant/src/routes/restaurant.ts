import express from "express";
import { isAuth, isSeller } from "../middlewares/isAuth";
import { addRestaurant, fetchMyRestaurant } from "../controllers/Restaurant";
import uploadFile from "../middlewares/multer";

const router = express.Router();
router.post("/new", isAuth, isSeller,uploadFile, addRestaurant);
router.get("/myRestaurant", isAuth, isSeller, fetchMyRestaurant);

export default router;
