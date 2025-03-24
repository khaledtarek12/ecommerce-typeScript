import { body, param } from "express-validator";
import validatorMiddleware from "../middlewares/validator.middleware";
import UserModel from "./user.module";

class UsersValidation {
  createUser = [
    body("name")
      .notEmpty()
      .withMessage((value, { req }) => req.__("validation_field"))
      .isLength({ min: 3 })
      .withMessage((value, { req }) => req.__("validation_length_short")),

    body("email")
      .notEmpty()
      .withMessage((value, { req }) => req.__("validation_field"))
      .isEmail()
      .withMessage((value, { req }) => req.__("validation_email"))
      .custom(async (value: string, { req }) => {
        const user = await UserModel.findOne({ email: value });
        if (user) throw new Error(`${req.__("validation_email_check")}`);
        return true;
      }),

    body("password")
      .notEmpty()
      .withMessage((value, { req }) => req.__("validation_field"))
      .isLength({ min: 6 })
      .withMessage((value, { req }) => req.__("validation_length_short"))
      .custom((value, { req }) => {
        if (value !== req.body.passwordConfirmation)
          throw new Error(`${req.__("validation_password_match")}`);
        return true;
      }),

    body("passwordConfirmation")
      .notEmpty()
      .withMessage((value, { req }) => req.__("validation_field")),

    body("profileImg").optional(),
    body("role").optional(),
    body("phone")
      .isMobilePhone(["ar-EG", "ar-SA"])
      .withMessage((value, { req }) => req.__("validation_phone"))
      .optional(),
    validatorMiddleware,
  ];

  updateUser = [
    param("id")
      .isMongoId()
      .withMessage((value, { req }) => req.__("validation_value")),
    body("name")
      .optional()
      .isLength({ min: 2, max: 50 })
      .withMessage((value, { req }) => req.__("validation_length_short")),

    body("email")
      .optional()
      .isEmail()
      .withMessage((value, { req }) => req.__("validation_email"))
      .custom(async (value: string, { req }) => {
        const user = await UserModel.findOne({ email: value });
        if (user) throw new Error(`${req.__("validation_email_check")}`);
        return true;
      }),

    body("password")
      .optional()
      .isLength({ min: 6 })
      .withMessage((value, { req }) => req.__("validation_length_short")),

    body("profileImg").optional(),
    body("role").optional(),
    body("phone")
      .isMobilePhone(["ar-EG", "ar-SA"])
      .withMessage((value, { req }) => req.__("validation_phone"))
      .optional(),
    validatorMiddleware,
  ];

  getUser = [
    param("id")
      .isMongoId()
      .withMessage((value, { req }) => req.__("validation_value")),
    validatorMiddleware,
  ];

  deleteUser = [
    param("id")
      .isMongoId()
      .withMessage((value, { req }) => req.__("validation_value")),
    validatorMiddleware,
  ];
}

const userValidation = new UsersValidation();
export default userValidation;
