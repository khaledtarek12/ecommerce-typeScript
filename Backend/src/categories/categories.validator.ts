import { body, param } from "express-validator";
import CategoriesModel from "./categories.schema";
import validatorMiddleware from "../middlewares/validator.middleware";

class CategoriesValidation {
  createCategory = [
    body("name")
      .notEmpty()
      .withMessage((value, { req }) => req.__("validation_field"))
      .isLength({ min: 2, max: 50 })
      .withMessage((value, { req }) => req.__("validation_length_short"))
      .custom(async (value: string, { req }) => {
        const category = await CategoriesModel.findOne({ name: value });
        if (category) throw new Error(`${req.__("validation_field")}`);
        return true;
      }),
    validatorMiddleware,
  ];

  updateCategory = [
    param("id")
      .isMongoId()
      .withMessage((value, { req }) => req.__("validation_value")),
    body("name")
      .optional()
      .isLength({ min: 2, max: 50 })
      .withMessage((value, { req }) => req.__("validation_length_short"))
      .custom(async (value: string, { req }) => {
        const category = await CategoriesModel.findOne({ name: value });
        if (category && category._id!.toString() !== req.params?.id)
          throw new Error(`${req.__("validation_field")}`);
        return true;
      }),
    validatorMiddleware,
  ];

  getCategory = [
    param("id")
      .isMongoId()
      .withMessage((value, { req }) => req.__("validation_value")),
    validatorMiddleware,
  ];
  deleteCategory = [
    param("id")
      .isMongoId()
      .withMessage((value, { req }) => req.__("validation_value")),
    validatorMiddleware,
  ];
}

const categoriesValidation = new CategoriesValidation();
export default categoriesValidation;
