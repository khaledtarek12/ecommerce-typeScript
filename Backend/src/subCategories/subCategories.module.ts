import mongoose from "mongoose";
import { SubCategories } from "./subCategories.interface";

const SubCategoriesSchema = new mongoose.Schema<SubCategories>(
  {
    name: { type: String, required: true, trim: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "categories" },
    image: String,
  },
  {
    timestamps: true,
  }
);

SubCategoriesSchema.pre<SubCategories>(/^find/, function (next) {
  this.populate({
    path: "category",
    select: "name",
  });
  next();
});

const SubCategoriesModel = mongoose.model<SubCategories>(
  "subCategories",
  SubCategoriesSchema
);

export default SubCategoriesModel;
