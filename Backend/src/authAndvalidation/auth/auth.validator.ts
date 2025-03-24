import { body, param } from "express-validator";
import bcrypt from "bcrypt";
import ApiErrors from "../../utils/apiErrors";
import validatorMiddleware from "../../middlewares/validator.middleware";
import UserModel from "../validation/user.module";

class AuthValidation {
  SignUp = [
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
        if (user)
          throw new ApiErrors(`${req.__("validation_email_check")}`, 400);
        return true;
      }),

    body("password")
      .notEmpty()
      .withMessage((value, { req }) => req.__("validation_field"))
      .isLength({ min: 6 })
      .withMessage((value, { req }) => req.__("validation_length_short"))
      .custom((value, { req }) => {
        if (value !== req.body.passwordConfirmation)
          throw new ApiErrors(`${req.__("validation_password_match")}`, 400);
        return true;
      }),

    body("passwordConfirmation")
      .notEmpty()
      .withMessage((value, { req }) => req.__("validation_field")),

    validatorMiddleware,
  ];

  logIn = [
    body("email")
      .notEmpty()
      .withMessage((value, { req }) => req.__("validation_field"))
      .isEmail()
      .withMessage((value, { req }) => req.__("validation_email")),

    body("password")
      .notEmpty()
      .withMessage((value, { req }) => req.__("validation_field")),

    validatorMiddleware,
  ];
}

const authValidation = new AuthValidation();
export default authValidation;
