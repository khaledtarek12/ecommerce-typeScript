import mongoose from "mongoose";
import { Categories } from "./categories.interface";

const CategoriesSchema = new mongoose.Schema<Categories>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    image: { type: String },
  },
  {
    timestamps: true,
  }
);

const CategoriesModel = mongoose.model<Categories>(
  "categories",
  CategoriesSchema
);

export default CategoriesModel;
