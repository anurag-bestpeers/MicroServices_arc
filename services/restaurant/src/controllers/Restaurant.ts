import axios from "axios";
import getBuffer from "../config/dataUri";
import { AuthenticatedRequest } from "../middlewares/isAuth";
import TryCatch from "../middlewares/trycatch";
import Restaurant from "../models/Restaurant";
import jwt from "jsonwebtoken";

export const addRestaurant = TryCatch(
  async (req: AuthenticatedRequest, res) => {
    const user = req.user;

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    const existingRestaurant = await Restaurant.findOne({ ownerId: user?._id });

    if (existingRestaurant) {
      return res.status(400).json({ message: "You Already have a Restaurant" });
    }

    const { name, description, latitude, longitude, formattedAddress, phone } =
      req.body;

    if (!name || !latitude || !longitude) {
      return res.status(400).json({ message: "Missing mandatory fields" });
    }

    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "Missing file" });
    }

    const fileBuffer = getBuffer(file);

    if (!fileBuffer) {
      return res.status(500).json({ message: "Failed to create File Buffer" });
    }

    const { data: uploadResult } = await axios.post(
      `${process.env.UTILS_SERVICE}/api/upload`,
      {
        buffer: fileBuffer.content,
      },
    );
    const restaurant = await Restaurant.create({
      name,
      description,
      phone,
      image: uploadResult.url,
      ownerId: user._id,
      autoLocation: {
        type: "Point",
        coordinates: [Number(longitude), Number(latitude)],
        formattedAddress,
      },
      isverified:false,
      isOpen:false
    });
    res
      .status(201)
      .json({ message: "Restaurant Created Successfully", restaurant });
  },
);

export const fetchMyRestaurant = TryCatch(
  async (req: AuthenticatedRequest, res) => {
    if (!req?.user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    const restaurant = await Restaurant.findOne({ ownerId: req?.user?._id });

    if (!restaurant) {
      return res.status(404).json({ message: "No Restaurant Found" });
    }

    if (!req?.user?.restaurantId) {
      const token = jwt.sign(
        { user: { ...req?.user, restaurantId: restaurant?._id } },
        process.env.JWT_SEC as string,
        { expiresIn: "15d" },
      );
      return res.status(200).json({ token, restaurant });
    }
    return res.status(200).json({ restaurant });
  },
);
