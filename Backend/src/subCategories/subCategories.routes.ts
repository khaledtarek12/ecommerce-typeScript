import { Router } from "express";
import SubCategoriesService from "./subCategories.service";

const subCategoriesRouter: Router = Router({ mergeParams: true });

subCategoriesRouter
  .route("/")
  .get(SubCategoriesService.filterSubCategories, SubCategoriesService.getAll)
  .post(SubCategoriesService.setCategoryId, SubCategoriesService.createOne);

subCategoriesRouter
  .route("/:id")
  .get(SubCategoriesService.getOne)
  .put(SubCategoriesService.updateOne)
  .delete(SubCategoriesService.deleteOne);

export default subCategoriesRouter;
