import mongoose from "mongoose";
import { Products } from "./products.interface";

const ProductsSchema = new mongoose.Schema<Products>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "categories" },
    subCategory: { type: mongoose.Schema.Types.ObjectId, ref: "subCategories" },
    price: { type: Number, required: true },
    discount: { type: Number },
    priceAfterDiscount: { type: Number },
    quantity: { type: Number, default: 0 },
    sold: { type: Number, default: 0 },
    rateAvg: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    cover: String,
    images: [String],
  },
  {
    timestamps: true,
  }
);
const setImageUrl = (doc: mongoose.Document & Products) => {
  if (doc.cover) {
    const imageUrl = `${process.env.BASE_URL}/images/products/${doc.cover}`;
    doc.cover = imageUrl;
  }
  if (doc.images) {
    const imagesUrl = doc.images.map((img) => `${process.env.BASE_URL}/images/products/${img}`).reverse();
    doc.images = imagesUrl;
  }
};

ProductsSchema.post("save", (doc) => setImageUrl(doc));
ProductsSchema.post("init", (doc) => setImageUrl(doc));


ProductsSchema.pre<Products>(/^find/, function (next) {
  this.populate({
    path: "subCategory",
    select: "name cover",
  });
  next();
});

const ProductsModel = mongoose.model<Products>("products", ProductsSchema);

export default ProductsModel;
