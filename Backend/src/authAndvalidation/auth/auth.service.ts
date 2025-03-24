import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Request, Response, NextFunction } from "express";
import UserModel from "../validation/user.module";
import ApiErrors from "../../utils/apiErrors";

class AuthService {
  signUp = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      //1-create user
      const user = await UserModel.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      //2-create token
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET_KEY!,
        {
          expiresIn: "90d",
        }
      );
      //3-send response
      res.status(201).json({ data: user, token });
    }
  );

  logIn = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      //1-check if user exist
      const user = await UserModel.findOne({ email: req.body.email });

      if (!user || !(await bcrypt.compare(req.body.password, user!.password))) {
        return next(new ApiErrors(req.__("invalid_email_and_password"), 401));
      }

      //2-create token
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET_KEY!,
        {
          expiresIn: "90d",
        }
      );

      //3-send response
      res.status(200).json({ data: user, token });
    }
  );

  protect = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      //1-check if token exist
      let token;
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
      ) {
        token = req.headers.authorization.split(" ")[1];
      }

      if (!token) {
        return next(new ApiErrors(req.__("you_are_not_logged_in"), 401));
      }
      //2-check if token is valid(not expired - not changes happend)
      //3-check if user still exist
      //4-check if user change password after token was issued
    }
  );
}

const authService = new AuthService();

export default authService;
