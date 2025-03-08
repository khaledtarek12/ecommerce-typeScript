import { Router } from "express";
import SubCategoriesService from "./subCategories.service";
import subCategoriesValidation from "./subCategories.validator";

const subCategoriesRouter: Router = Router({ mergeParams: true });

subCategoriesRouter
  .route("/")
  .get(SubCategoriesService.filterSubCategories, SubCategoriesService.getAll)
  .post(
    SubCategoriesService.setCategoryId,
    subCategoriesValidation.createSubCategory,
    SubCategoriesService.createOne
  );

subCategoriesRouter
  .route("/:id")
  .get(subCategoriesValidation.getSubCategory,SubCategoriesService.getOne)
  .put(subCategoriesValidation.updateSubCategory,SubCategoriesService.updateOne)
  .delete(subCategoriesValidation.deleteSubCategory,SubCategoriesService.deleteOne);

export default subCategoriesRouter;
