import express from "express";
import CategoriesRouter from "./categories/categories.routes";
import subCategoriesRouter from "./subCategories/subCategories.routes";
import glopalErrors from "./middlewares/error.middleware";
import ApiErrors from "./utils/apiErrors";
import productsRouter from "./products/products.routes";

declare module "express" {
  interface Request {
    filterData?: any;
  }
}

const mountedRoutes = (app: express.Application) => {
  app.use("/api/v1/categories", CategoriesRouter);
  app.use("/api/v1/subcategories", subCategoriesRouter);
  app.use("/api/v1/products", productsRouter);
  app.all("*", (req, res, next) => {
    next(new ApiErrors(`Route ${req.originalUrl} Not Found `, 404));
  });
  app.use(glopalErrors);
};

export default mountedRoutes;
