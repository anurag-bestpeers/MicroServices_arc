import mongoose, { Schema, Document } from "mongoose";

export interface IRestaurant extends Document {
  name: string;
  description?: string;
  image: string;
  ownerId: string;
  phone: number;
  isverified: boolean;
  autoLocation: {
    type: "point";
    coordinates: [number, number]; // [longitude,latitude]
    formattedAddress: string;
  };
  isOpen: boolean;
  createdAt: Date;
}

const schema = new Schema<IRestaurant>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: String,
    image: {
      type: String,
      required: true,
    },
    ownerId: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    isverified: {
      type: Boolean,
      required: true,
      default: false,
    },
    autoLocation: {
      type: {
        type: String,
        enum: ["point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
      formattedAddress: String,
    },
    isOpen: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true },
);

schema.index({ autoLocation: "2dsphere" });

export default mongoose.model<IRestaurant>("Restaurant", schema);
