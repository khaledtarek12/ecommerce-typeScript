import { Categories } from "./categories.interface";
import CategoriesModel from "./categories.schema";
import refactorService from "../refator.service";

class CategoriesService {
  getAll = refactorService.getAll<Categories>(CategoriesModel);

  createOne = refactorService.createOne<Categories>(CategoriesModel);

  getOne = refactorService.getOne<Categories>(CategoriesModel);

  updateOne = refactorService.updateOne<Categories>(CategoriesModel);

  deleteOne = refactorService.deleteOne<Categories>(CategoriesModel);
}

const categoriesService = new CategoriesService();
export default categoriesService;
