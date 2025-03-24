import { Router } from "express";
import authValidation from "./auth.validator";
import authService from "./auth.service";

const AuthRouter: Router = Router();

AuthRouter.route("/signup").post(authValidation.SignUp, authService.signUp);
AuthRouter.route("/login").post(authValidation.logIn, authService.logIn);

export default AuthRouter;
