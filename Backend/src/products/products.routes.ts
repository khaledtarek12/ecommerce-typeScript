import { Router } from "express";
import ProductsService from "./products.service";
import productsValidation from "./products.validator";

const productsRouter: Router = Router();

productsRouter
  .route("/")
  .get(ProductsService.getAll)
  .post(productsValidation.createSubCategory, ProductsService.createOne);

productsRouter
  .route("/:id")
  .get(productsValidation.getSubCategory, ProductsService.getOne)
  .put(productsValidation.updateSubCategory, ProductsService.updateOne)
  .delete(productsValidation.deleteSubCategory, ProductsService.deleteOne);

export default productsRouter;
