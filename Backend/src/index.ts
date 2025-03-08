import express from "express";
import CategoriesRouter from "./categories/categories.routes";
import subCategoriesRouter from "./subCategories/subCategories.routes";

declare module "express" {
  interface Request {
    filterData?: any;
  }
}

const mountedRoutes = (app: express.Application) => {
  app.use("/api/v1/categories", CategoriesRouter);
  app.use("/api/v1/subcategories", subCategoriesRouter);
};

export default mountedRoutes;
