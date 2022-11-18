import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  detail: {
    type: String,
    required: false,
  },
});

export const Product =
  mongoose.models.Product ||
  mongoose.model("Product", ProductSchema, "products");
