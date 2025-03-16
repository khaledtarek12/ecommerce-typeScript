import { Request, Response, NextFunction } from "express";
import ProductsModel from "./products.module";
import { Products } from "./products.interface";
import refactorService from "../refator.service";
import sharp from "sharp";
import { uploadSingleFile } from "../middlewares/uploadFiles.middleware";
class ProductsService {
  getAll = refactorService.getAll<Products>(ProductsModel, "products");

  createOne = refactorService.createOne<Products>(ProductsModel);

  getOne = refactorService.getOne<Products>(ProductsModel);

  updateOne = refactorService.updateOne<Products>(ProductsModel);

  deleteOne = refactorService.deleteOne<Products>(ProductsModel);

  uploadImages = uploadSingleFile(["image"], "cover");

  saveImage = async (req: Request, res: Response, next: NextFunction) => {
    if (req.file) {
      const fileName = `product-${Date.now()}-cover.webp`;
      await sharp(req.file.buffer)
        .resize(1200, 1200)
        .webp({ quality: 95 })
        .toFile(`uploads/images/products/${fileName}`);

      req.body.cover = fileName;
    }
    next();
  };
}

const productsService = new ProductsService();
export default productsService;
