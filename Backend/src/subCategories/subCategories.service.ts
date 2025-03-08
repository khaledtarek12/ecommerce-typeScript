import { Request, Response, NextFunction } from "express";
import AsyncHandler from "express-async-handler";
import SubCategoriesModel from "./subCategories.module";
import { SubCategories } from "./subCategories.interface";
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

  getAll = AsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      let filterData: any = {};
      if (req.filterData) filterData = req.filterData;
      const subCategories: SubCategories[] = await SubCategoriesModel.find(
        filterData
      );
      res.status(200).json({ data: subCategories });
    }
  );

  createOne = AsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const subCategory: SubCategories = await SubCategoriesModel.create(
        req.body
      );
      res.status(201).json({ data: subCategory });
    }
  );

  getOne = AsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const subCategory: SubCategories | null =
        await SubCategoriesModel.findById(id);
      res.status(201).json({ data: subCategory });
    }
  );

  updateOne = AsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const subCategory: SubCategories | null =
        await SubCategoriesModel.findByIdAndUpdate(id, req.body, { new: true });
      res.status(201).json({ data: subCategory });
    }
  );

  deleteOne = AsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const subCategory: SubCategories | null =
        await SubCategoriesModel.findByIdAndDelete(id);
      res.status(204).json();
    }
  );
}

const SubCategoriesService = new subCategoriesService();
export default SubCategoriesService;
