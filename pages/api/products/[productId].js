import mongoose from "mongoose";
import connectDB from "../_db/connect-db";
import { Product } from "../_db/models/Product";

async function handler(req, res) {
  switch (req.method) {
    case "GET":
      try {
        const product = await Product.findById(req.query.productId);
        if (product) {
          return res.status(200).json(product);
        } else {
          return res.status(500).json({ error: "product not found" });
        }
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
      break;
    case "DELETE":
      try {
        const deletedProduct = await Product.findByIdAndDelete(
          req.query.productId
        );
        return res
          .status(200)
          .json({ message: `Product ${deletedProduct.name} deleted` });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
      break;
    default:
      return res.status(400).json({ error: "method not supported" });
  }
}

export default connectDB(handler);
