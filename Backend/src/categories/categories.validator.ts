import { body, param } from "express-validator";
import CategoriesModel from "./categories.schema";
import validatorMiddleware from "../middlewares/validator.middleware";

class CategoriesValidation {
  createCategory = [
    body("name")
      .notEmpty()
      .withMessage("Category name is required")
      .isLength({ min: 2, max: 50 })
      .withMessage("invalid category length")
      .custom(async (value: string) => {
        const category = await CategoriesModel.findOne({ name: value });
        if (category) throw new Error("Category already exists");
        return true;
      }),
    validatorMiddleware,
  ];

  updateCategory = [
    param("id").isMongoId().withMessage("invalid Id"),
    body("name")
      .optional()
      .isLength({ min: 2, max: 50 })
      .withMessage("invalid category length")
      .custom(async (value: string, { req }) => {
        const category = await CategoriesModel.findOne({ name: value });
        if (category && category._id!.toString() !== req.params?.id)
          throw new Error("Category already exists");
        return true;
      }),
    validatorMiddleware,
  ];

  getCategory = [
    param("id").isMongoId().withMessage("invalid Id"),
    validatorMiddleware,
  ];
  deleteCategory = [
    param("id").isMongoId().withMessage("invalid Id"),
    validatorMiddleware,
  ];
}

const categoriesValidation = new CategoriesValidation();
export default categoriesValidation;
