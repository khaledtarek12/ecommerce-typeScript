import { body, param } from "express-validator";
import validatorMiddleware from "../middlewares/validator.middleware";
import CategoriesModel from "../categories/categories.schema";

class SubCategoriesValidation {
  createSubCategory = [
    body("name")
      .notEmpty()
      .withMessage((value, { req }) => req.__("validation_field"))
      .isLength({ min: 2, max: 50 })
      .withMessage((value, { req }) => req.__("validation_length_short")),
    body("category")
      .notEmpty()
      .withMessage((value, { req }) => req.__("validation_field"))
      .isMongoId()
      .withMessage((value, { req }) => req.__("validation_value"))
      .custom(async (value: string, { req }) => {
        const category = await CategoriesModel.findById(value);
        if (!category) throw new Error(`${req.__("validation_field")}`);
        return true;
      }),
    validatorMiddleware,
  ];

  updateSubCategory = [
    param("id")
      .isMongoId()
      .withMessage((value, { req }) => req.__("validation_value")),
    body("name")
      .optional()
      .isLength({ min: 2, max: 50 })
      .withMessage((value, { req }) => req.__("validation_length_short")),
    body("category")
      .optional()
      .isMongoId()
      .withMessage((value, { req }) => req.__("validation_value"))
      .custom(async (value: string, { req }) => {
        const category = await CategoriesModel.findById(value);
        if (!category) throw new Error(`${req.__("validation_field")}`);
        return true;
      }),
    validatorMiddleware,
  ];

  getSubCategory = [
    param("id")
      .isMongoId()
      .withMessage((value, { req }) => req.__("validation_value")),
    validatorMiddleware,
  ];

  deleteSubCategory = [
    param("id")
      .isMongoId()
      .withMessage((value, { req }) => req.__("validation_value")),
    validatorMiddleware,
  ];
}

const subCategoriesValidation = new SubCategoriesValidation();
export default subCategoriesValidation;
