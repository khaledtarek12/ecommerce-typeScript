import { Router } from "express";
import categoriesService from "./categories.service";
import subCategoriesRouter from "../subCategories/subCategories.routes";
import categoriesValidation from "./categories.validator";

const CategoriesRouter: Router = Router();

CategoriesRouter.use("/:categoryId/subcategories", subCategoriesRouter);

CategoriesRouter.route("/")
  .get(categoriesService.getAll)
  .post(categoriesValidation.createCategory, categoriesService.createOne);

CategoriesRouter.route("/:id")
  .get(categoriesValidation.getCategory,categoriesService.getOne)
  .put(categoriesValidation.updateCategory, categoriesService.updateOne)
  .delete(categoriesValidation.deleteCategory, categoriesService.deleteOne);

export default CategoriesRouter;
