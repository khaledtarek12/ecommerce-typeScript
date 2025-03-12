import ProductsModel from "./products.module";
import { Products } from "./products.interface";
import refactorService from "../refator.service";
class ProductsService {

  getAll = refactorService.getAll<Products>(ProductsModel , 'products');

  createOne = refactorService.createOne<Products>(ProductsModel);

  getOne = refactorService.getOne<Products>(ProductsModel);

  updateOne = refactorService.updateOne<Products>(ProductsModel);

  deleteOne = refactorService.deleteOne<Products>(ProductsModel);
}

const productsService = new ProductsService();
export default productsService;
