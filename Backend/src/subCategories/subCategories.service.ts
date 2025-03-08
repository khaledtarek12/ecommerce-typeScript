import { Request, Response, NextFunction } from "express";
import AsyncHandler from "express-async-handler";
import SubCategoriesModel from "./subCategories.module";
import { SubCategories } from "./subCategories.interface";
import refactorService from "../refator.service";
class subCategoriesService {
  setCategoryId(req: Request, res: Response, next: NextFunction) {
    if (req.params.categoryId && !req.body.categoryId)
      req.body.category = req.params.categoryId;
    next();
  }

  filterSubCategories(req: Request, res: Response, next: NextFunction) {
    const filterData: any = {};
    if (req.params.categoryId) filterData.category = req.params.categoryId;
    req.filterData = filterData;
    next();
  }

  getAll = refactorService.getAll<SubCategories>(SubCategoriesModel);

  createOne = refactorService.createOne<SubCategories>(SubCategoriesModel);

  getOne = refactorService.getOne<SubCategories>(SubCategoriesModel);

  updateOne = refactorService.updateOne<SubCategories>(SubCategoriesModel);

  deleteOne = refactorService.deleteOne<SubCategories>(SubCategoriesModel);
}

const SubCategoriesService = new subCategoriesService();
export default SubCategoriesService;
