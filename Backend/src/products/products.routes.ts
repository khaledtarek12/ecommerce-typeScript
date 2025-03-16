import { Router, Request, Response, NextFunction } from "express";
import ProductsService from "./products.service";
import productsValidation from "./products.validator";
import multer from "multer";
import sharp from "sharp";
import productsService from "./products.service";

const productsRouter: Router = Router();

productsRouter
  .route("/")
  .get(ProductsService.getAll)
  .post(
    productsService.uploadImages,
    ProductsService.saveImage,
    productsValidation.createSubCategory,
    ProductsService.createOne
  );

productsRouter
  .route("/:id")
  .get(productsValidation.getSubCategory, ProductsService.getOne)
  .put(
    productsService.uploadImages,
    ProductsService.saveImage,
    productsValidation.updateSubCategory,
    ProductsService.updateOne
  )
  .delete(productsValidation.deleteSubCategory, ProductsService.deleteOne);

export default productsRouter;
