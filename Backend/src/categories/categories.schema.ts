import mongoose, { Mongoose } from "mongoose";
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
const setImageUrl = (doc: mongoose.Document & Categories) => {
  if (doc.image) {
    const imageUrl = `${process.env.BASE_URL}/images/categories/${doc.image}`;
    doc.image = imageUrl;
  }
};

CategoriesSchema.post("save", (doc) => setImageUrl(doc));
CategoriesSchema.post("init", (doc) => setImageUrl(doc));

const CategoriesModel = mongoose.model<Categories>(
  "categories",
  CategoriesSchema
);

export default CategoriesModel;
