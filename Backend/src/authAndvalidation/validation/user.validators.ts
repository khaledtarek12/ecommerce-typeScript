import { body, param } from "express-validator";
import UserModel from "./user.module";
import bcrypt from "bcrypt";
import ApiErrors from "../../utils/apiErrors";
import validatorMiddleware from "../../middlewares/validator.middleware";

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
        if (user) throw new ApiErrors(`${req.__("validation_email_check")}` , 400);
        return true;
      }),

    body("password")
      .notEmpty()
      .withMessage((value, { req }) => req.__("validation_field"))
      .isLength({ min: 6 })
      .withMessage((value, { req }) => req.__("validation_length_short"))
      .custom((value, { req }) => {
        if (value !== req.body.passwordConfirmation)
          throw new ApiErrors(`${req.__("validation_password_match")}` , 400);
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

    body("profileImg").optional(),
    body("role").optional(),
    body("phone")
      .isMobilePhone(["ar-EG", "ar-SA"])
      .withMessage((value, { req }) => req.__("validation_phone"))
      .optional(),
    validatorMiddleware,
  ];

  updateUserPassword = [
    param("id")
      .isMongoId()
      .withMessage((value, { req }) => req.__("validation_value")),

    body("currentPassword")
      .notEmpty()
      .withMessage((value, { req }) => req.__("validation_field")),

    body("passwordConfirmation")
      .notEmpty()
      .withMessage((value, { req }) => req.__("validation_field")),

    body("password")
      .notEmpty()
      .withMessage((value, { req }) => req.__("validation_field"))
      .isLength({ min: 6 })
      .withMessage((value, { req }) => req.__("validation_length_short"))
      .custom(async (value, { req }) => {
        const user = await UserModel.findById(req.params!.id);
        if (!user) throw new ApiErrors(`${req.__("not_found")}`, 404);
        const isMatch = await bcrypt.compare(
          req.body.currentPassword,
          user.password!
        );
        if (!isMatch)
          throw new ApiErrors(`${req.__("validation_password_match")}`, 400);

        if (value !== req.body.passwordConfirmation)
          throw new ApiErrors(`${req.__("validation_password_match")}`, 400);
        return true;
      }),

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
