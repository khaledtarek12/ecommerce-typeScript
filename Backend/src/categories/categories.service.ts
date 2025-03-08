import { Request, Response, NextFunction } from "express";
import { Categories } from "./categories.interface";
import CategoriesModel from "./categories.schema";
import AsyncHandler from "express-async-handler";

class CategoriesService {
  getAll = AsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const categories: Categories[] = await CategoriesModel.find();
      res.status(200).json({ data: categories });
    }
  );

  createOne = AsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const category: Categories = await CategoriesModel.create(req.body);
      res.status(201).json({ data: category });
    }
  );

  getOne = AsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const category: Categories | null = await CategoriesModel.findById(id);
      res.status(201).json({ data: category });
    }
  );

  updateOne = AsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const category: Categories | null =
        await CategoriesModel.findByIdAndUpdate(id, req.body, { new: true });
      res.status(201).json({ data: category });
    }
  );

  deleteOne = AsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const category: Categories | null =
        await CategoriesModel.findByIdAndDelete(id);
      res.status(204).json();
    }
  );
}

const categoriesService = new CategoriesService();
export default categoriesService;
