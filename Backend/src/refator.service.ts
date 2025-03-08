import { Request, Response, NextFunction } from "express";
import AsyncHandler from "express-async-handler";
import mongoose from "mongoose";
import ApiErrors from "./utils/apiErrors";

class RefactorService {
  getAll = <modelType>(model: mongoose.Model<any>) =>
    AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
      let filterData: any = {};
      if (req.filterData) filterData = req.filterData;
      const documents: modelType[] = await model.find(filterData);
      res.status(200).json({ data: documents });
    });

  createOne = <modelType>(model: mongoose.Model<any>) =>
    AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
      const document: modelType = await model.create(req.body);
      res.status(201).json({ data: document });
    });

  getOne = <modelType>(model: mongoose.Model<any>) =>
    AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const document: modelType | null = await model.findById(id);
      if (!document) return next(new ApiErrors(req.__("not_found"), 404));
      res.status(201).json({ data: document });
    });

  updateOne = <modelType>(model: mongoose.Model<any>) =>
    AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const document: modelType | null = await model.findByIdAndUpdate(
        id,
        req.body,
        { new: true }
      );
      if (!document) return next(new ApiErrors(req.__("not_found"), 404));
      res.status(201).json({ data: document });
    });

  deleteOne = <modelType>(model: mongoose.Model<any>) =>
    AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const document: modelType | null = await model.findByIdAndDelete(id);
      if (!document) return next(new ApiErrors(req.__("not_found"), 404));
      res.status(204).json();
    });
}

const refactorService = new RefactorService();
export default refactorService;
