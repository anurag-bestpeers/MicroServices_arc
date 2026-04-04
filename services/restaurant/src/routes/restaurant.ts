import express from "express";
import { isAuth, isSeller } from "../middlewares/isAuth";
import { addRestaurant } from "../controllers/Restaurant";

const router = express.Router();

router.post("/new", isAuth, isSeller, addRestaurant);

export default router;
