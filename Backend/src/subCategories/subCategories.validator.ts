import { body, param } from "express-validator";
import validatorMiddleware from "../middlewares/validator.middleware";
import CategoriesModel from "../categories/categories.schema";

class SubCategoriesValidation {
  createSubCategory = [
    body("name")
      .notEmpty()
      .withMessage("SubCategory name is required")
      .isLength({ min: 2, max: 50 })
      .withMessage("invalid category length"),
    body("category")
      .notEmpty()
      .withMessage("Category is required")
      .isMongoId()
      .withMessage("invalid Id")
      .custom(async (value: string, { req }) => {
        const category = await CategoriesModel.findById(value);
        if (!category) throw new Error("Category not found");
        return true;
      }),
    validatorMiddleware,
  ];

  updateSubCategory = [
    param("id").isMongoId().withMessage("invalid Id"),
    body("name")
      .optional()
      .isLength({ min: 2, max: 50 })
      .withMessage("invalid category length"),
    body("category")
      .optional()
      .isMongoId()
      .withMessage("invalid Id")
      .custom(async (value: string) => {
        const category = await CategoriesModel.findById(value);
        if (!category) throw new Error("Category not found");
        return true;
      }),
    validatorMiddleware,
  ];

  getSubCategory = [
    param("id").isMongoId().withMessage("invalid Id"),
    validatorMiddleware,
  ];

  deleteSubCategory = [
    param("id").isMongoId().withMessage("invalid Id"),
    validatorMiddleware,
  ];
}

const subCategoriesValidation = new SubCategoriesValidation();
export default subCategoriesValidation;
