import { Router } from "express";
import categoriesService from "./categories.service";
import subCategoriesRouter from "../subCategories/subCategories.routes";
import categoriesValidation from "./categories.validator";
import authService from "../authAndvalidation/auth/auth.service";

const CategoriesRouter: Router = Router();

CategoriesRouter.use("/:categoryId/subcategories", subCategoriesRouter);

CategoriesRouter.route("/")
  .get(categoriesService.getAll)
  .post(
    authService.protect,
    categoriesService.uploadImages,
    categoriesService.saveImage,
    categoriesValidation.createCategory,
    categoriesService.createOne
  );

CategoriesRouter.route("/:id")
  .get(categoriesValidation.getCategory, categoriesService.getOne)
  .put(
    categoriesService.uploadImages,
    categoriesService.saveImage,
    categoriesValidation.updateCategory,
    categoriesService.updateOne
  )
  .delete(categoriesValidation.deleteCategory, categoriesService.deleteOne);

export default CategoriesRouter;
