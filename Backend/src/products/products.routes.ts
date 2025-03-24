import { Router } from "express";
import ProductsService from "./products.service";
import productsValidation from "./products.validator";

import productsService from "./products.service";

const ProductsRouter: Router = Router();

ProductsRouter.route("/")
  .get(ProductsService.getAll)
  .post(
    productsService.uploadImages,
    ProductsService.saveImage,
    productsValidation.createSubCategory,
    ProductsService.createOne
  );

ProductsRouter.route("/:id")
  .get(productsValidation.getSubCategory, ProductsService.getOne)
  .put(
    productsService.uploadImages,
    ProductsService.saveImage,
    productsValidation.updateSubCategory,
    ProductsService.updateOne
  )
  .delete(productsValidation.deleteSubCategory, ProductsService.deleteOne);

export default ProductsRouter;
