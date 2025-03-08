import { Document } from "mongoose";
import { Categories } from "../categories/categories.interface";
import { SubCategories } from "../subCategories/subCategories.interface";

export interface Products extends Document {
  readonly name: string;
  readonly description: string;
  readonly category: Categories;
  readonly subCategory: SubCategories;
  readonly price: number;
  readonly discount: number;
  readonly priceAfterDiscount: number;
  readonly sold: number;
  readonly quantity: number;
  readonly rateAvg: number;
  readonly rating: number;
  cover: string;
  images: string[];
}
