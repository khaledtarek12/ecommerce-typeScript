import { Request, Response, NextFunction } from "express";
import ProductsModel from "./products.module";
import { Products } from "./products.interface";
import refactorService from "../refator.service";
import sharp from "sharp";
import { uploadMultipleFiles } from "../middlewares/uploadFiles.middleware";
import expressAsyncHandler from "express-async-handler";
class ProductsService {
  getAll = refactorService.getAll<Products>(ProductsModel, "products");

  createOne = refactorService.createOne<Products>(ProductsModel);

  getOne = refactorService.getOne<Products>(ProductsModel);

  updateOne = refactorService.updateOne<Products>(ProductsModel);

  deleteOne = refactorService.deleteOne<Products>(ProductsModel);

  uploadImages = uploadMultipleFiles(
    ["image"],
    [
      { name: "cover", maxCount: 1 },
      { name: "images", maxCount: 5 },
    ]
  );

  saveImage = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      if (files.cover) {
        const fileName = `product-${Date.now()}-cover.webp`;
        await sharp(files.cover[0].buffer)
          .resize(2000, 1333)
          .webp({ quality: 95 })
          .toFile(`uploads/images/products/${fileName}`);

        req.body.cover = fileName;
      }
      if (files.images) {
        req.body.images = [];
        await Promise.all(
          files.images.map(async (img, index) => {
            const fileName = `product-${Date.now()}-image-${index + 1}.webp`;
            await sharp(img.buffer)
              .resize(2000, 1333)
              .webp({ quality: 95 })
              .toFile(`uploads/images/products/${fileName}`);
            req.body.images.push(fileName);
          })
        );
      }
      next();
    }
  );
}

const productsService = new ProductsService();
export default productsService;
