import { Request, Response, NextFunction } from "express";
import { Categories } from "./categories.interface";
import CategoriesModel from "./categories.schema";
import refactorService from "../refator.service";
import sharp from "sharp";
import { uploadSingleFile } from "../middlewares/uploadFiles.middleware";
import expressAsyncHandler from "express-async-handler";

class CategoriesService {
  getAll = refactorService.getAll<Categories>(CategoriesModel);

  createOne = refactorService.createOne<Categories>(CategoriesModel);

  getOne = refactorService.getOne<Categories>(CategoriesModel);

  updateOne = refactorService.updateOne<Categories>(CategoriesModel);

  deleteOne = refactorService.deleteOne<Categories>(CategoriesModel);

  uploadImages = uploadSingleFile(["image"], "image");

  saveImage = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      if (req.file) {
        const fileName = `category-${Date.now()}-image.webp`;
        await sharp(req.file.buffer)
          .resize(1200, 1200)
          .webp({ quality: 95 })
          .toFile(`uploads/images/categories/${fileName}`);

        req.body.image = fileName;
      }
      next();
    }
  );
}

const categoriesService = new CategoriesService();
export default categoriesService;
