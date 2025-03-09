import { body, param } from "express-validator";
import validatorMiddleware from "../middlewares/validator.middleware";
import SubCategoriesModel from "../subCategories/subCategories.module";
import CategoriesModel from "../categories/categories.schema";
import ProductsModel from "./products.module";

class ProductsValidation {
  createSubCategory = [
    body("name")
      .notEmpty()
      .withMessage((value, { req }) => req.__("validation_field"))
      .isLength({ min: 2, max: 100 })
      .withMessage((value, { req }) => req.__("validation_length_short")),
    body("description")
      .notEmpty()
      .withMessage((value, { req }) => req.__("validation_field"))
      .isLength({ min: 2, max: 500 })
      .withMessage((value, { req }) => req.__("validation_length_long")),
    body("price")
      .notEmpty()
      .withMessage((value, { req }) => req.__("validation_field"))
      .isFloat({ min: 1, max: 1000000 })
      .withMessage((value, { req }) => req.__("validation_length_long")),
    body("quantity")
      .optional()
      .isInt({ min: 1, max: 1000000 })
      .withMessage((value, { req }) => req.__("validation_length_long")),
    body("discount")
      .optional()
      .isFloat({ min: 1, max: 100 })
      .withMessage((value, { req }) => req.__("validation_length_long"))
      .custom((value, { req }) => {
        let newValue = value / 100;
        req.body.priceAfterDiscount =
          req.body.price - req.body.price * newValue;
        return true;
      }),

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

    body("subCategory")
      .notEmpty()
      .withMessage((value, { req }) => req.__("validation_field"))
      .isMongoId()
      .withMessage((value, { req }) => req.__("validation_value"))
      .custom(async (value: string, { req }) => {
        const subCategory = await SubCategoriesModel.findById(value);
        if (!subCategory) throw new Error(`${req.__("validation_field")}`);
        if (
          subCategory.category._id!.toString() !== req.body.category.toString()
        )
          throw new Error(`SubCategory not belong to this category`);
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
      .isLength({ min: 2, max: 100 })
      .withMessage((value, { req }) => req.__("validation_length_short")),
    body("description")
      .optional()
      .isLength({ min: 2, max: 500 })
      .withMessage((value, { req }) => req.__("validation_length_long")),
    body("price")
      .optional()
      .isFloat({ min: 1, max: 1000000 })
      .withMessage((value, { req }) => req.__("validation_length_long")),
    body("quantity")
      .optional()
      .isInt({ min: 1, max: 1000000 })
      .withMessage((value, { req }) => req.__("validation_length_long")),
    body("discount")
      .optional()
      .isFloat({ min: 1, max: 100 })
      .withMessage((value, { req }) => req.__("validation_length_long"))
      .custom((value, { req }) => {
        let newValue = value / 100;
        req.body.priceAfterDiscount =
          req.body.price - req.body.price * newValue;
        return true;
      }),

    body("category")
      .optional()
      .isMongoId()
      .withMessage((value, { req }) => req.__("validation_value"))
      .custom(async (value: string, { req }) => {
        const category = await CategoriesModel.findById(value);
        if (!category) throw new Error(`${req.__("validation_field")}`);
        return true;
      }),

    body("subCategory")
      .optional()
      .isMongoId()
      .withMessage((value, { req }) => req.__("validation_value"))
      .custom(async (value: string, { req }) => {
        const id = req.params?.id;
        const product = await ProductsModel.findById(id);

        if (!product) throw new Error(req.__("not_found"));

        const subCategory = await SubCategoriesModel.findById(value);
        if (!subCategory) throw new Error(`${req.__("validation_field")}`);
        if (
          subCategory.category._id!.toString() !==
          product.category._id!.toString()
        )
          throw new Error(`SubCategory not belong to this category`);
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

const subCategoriesValidation = new ProductsValidation();
export default subCategoriesValidation;

// exports.createProductValidator = [
//   //1- rules
//   check("title")
//     .notEmpty()
//     .withMessage("Product title is required")
//     .isLength({ min: 3 })
//     .withMessage("Product title must be at least 3 characters")
//     .custom((value, { req }) => {
//       req.body.slug = slugify(value);
//       return true;
//     }),

//   check("description")
//     .notEmpty()
//     .withMessage("Product description is required")
//     .isLength({ max: 2000 })
//     .withMessage("Product description must be at most 2000 characters"),

//   check("quantity")
//     .notEmpty()
//     .withMessage("Product quantity is required")
//     .isNumeric()
//     .withMessage("Product quantity must be a number"),

//   check("sold")
//     .optional()
//     .isNumeric()
//     .withMessage("Product quantity must be a number"),

//   check("price")
//     .notEmpty()
//     .withMessage("Product price is required")
//     .isNumeric()
//     .withMessage("Product price must be a number")
//     .isLength({ max: 32 })
//     .withMessage("Product price must be at most 32 characters"),

//   check("priceAfterDiscount")
//     .optional()
//     .isNumeric()
//     .withMessage("Product priceAfterDiscount must be a number")
//     .toFloat()
//     .custom((value, { req }) => {
//       if (value >= req.body.price) {
//         throw new Error("priceAfterDiscount cannot be greater than price");
//       }
//       return true;
//     }),

//   check("colors")
//     .optional()
//     .isArray()
//     .withMessage("Product colors must be an array of Strings"),

//   check("images")
//     .optional()
//     .isArray()
//     .withMessage("Product images must be an array of Strings"),

//   check("imageCover").notEmpty().withMessage("Product imageCover is required"),

//   check("category")
//     .notEmpty()
//     .withMessage("Product must be belong to a category")
//     .isMongoId()
//     .withMessage("Invalid category id format")
//     .custom((categoryId) =>
//       Category.findById(categoryId).then((category) => {
//         if (!category) {
//           return Promise.reject(
//             new Error(`No category for this id ${categoryId}`)
//           );
//         }
//       })
//     ),

//   check("subCategories")
//     .optional()
//     .isMongoId()
//     .withMessage("Invalid subCategory id format")
//     .custom((subCategoriesIds) =>
//       SubCategory.find({ _id: { $exists: true, $in: subCategoriesIds } }).then(
//         (result) => {
//           if (result.length < 1 || result.length !== subCategoriesIds.length) {
//             return Promise.reject(new Error(`No subCategory for these Ids`));
//           }
//         }
//       )
//     )
//     .custom((subCategoriesIds, { req }) =>
//       SubCategory.find({ category: req.body.category }).then(
//         (subCategories) => {
//           const subCategoriesListIdinDB = [];
//           subCategories.forEach((subCategory) => {
//             subCategoriesListIdinDB.push(subCategory._id.toString());
//           });
//           // check if subCategories Ids belong to this category in DB in req.body (true or false)
//           const checker = ({ target, array }) =>
//             target.every((item) => array.includes(item));
//           if (
//             !checker({
//               target: subCategoriesIds,
//               array: subCategoriesListIdinDB,
//             })
//           ) {
//             return Promise.reject(
//               new Error(`SubCategory not belong to this category`)
//             );
//           }
//         }
//       )
//     ),

//   check("brand")
//     .optional()
//     .isMongoId()
//     .withMessage("Invalid brand id format")
//     .custom((brandId) =>
//       Brand.findById(brandId).then((brand) => {
//         if (!brand) {
//           return Promise.reject(new Error(`No Brand for this id ${brandId}`));
//         }
//       })
//     ),

//   check("ratingsAverage")
//     .optional()
//     .isNumeric()
//     .withMessage("Product ratingsAverage must be a number")
//     .isLength({ min: 1 })
//     .withMessage("Rating must be above or equal 1.0")
//     .isLength({ max: 5 })
//     .withMessage("Rating must be below or equal 5.0"),

//   check("ratingsQuantity")
//     .optional()
//     .isNumeric()
//     .withMessage("Product ratingsQuantity must be a number"),
//   //2- middleware
//   validatiorMiddleware,
// ];
