import { Router } from "express";
import categoriesService from "./categories.service";
import subCategoriesRouter from "../subCategories/subCategories.routes";

const CategoriesRouter: Router = Router();

CategoriesRouter.use('/:categoryId/subcategories', subCategoriesRouter);

CategoriesRouter.route("/")
  .get(categoriesService.getAll)
  .post(categoriesService.createOne);

CategoriesRouter.route("/:id")
  .get(categoriesService.getOne)
  .put(categoriesService.updateOne)
  .delete(categoriesService.deleteOne);

export default CategoriesRouter;
