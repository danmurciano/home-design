import mongoose from "mongoose";
import formatPrice from "../utils/formatPrice.js";
import skuGenerator from "../utils/skuGenerator";

const { String, Number, Boolean } = mongoose.Schema.Types;

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
      set: formatPrice
    },
    sku: {
      type: String,
      unique: true,
      default: skuGenerator()
    },
    shortDesc: {
      type: String
    },
    description: {
      type: String,
      required: true
    },
    category: {
      type: String,
      default: "Other"
    },
    mediaUrl: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: [ "In Stock", "Out of Stock", "Discontinued" ]
    }
  },
  {
    versionKey: false
  }
);

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
