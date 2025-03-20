import { Request, Response, NextFunction } from "express";
import refactorService from "../refator.service";
import sharp from "sharp";
import { uploadSingleFile } from "../middlewares/uploadFiles.middleware";
import expressAsyncHandler from "express-async-handler";
import { User } from "./user.interface";
import UserModel from "./userModel.module";

class UserService {
  getAll = refactorService.getAll<User>(UserModel);

  createOne = refactorService.createOne<User>(UserModel);

  getOne = refactorService.getOne<User>(UserModel);

  updateOne = refactorService.updateOne<User>(UserModel);

  deleteOne = refactorService.deleteOne<User>(UserModel);

  uploadImages = uploadSingleFile(["image"], "profileImg");

  saveImage = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      if (req.file) {
        const fileName = `user-${Date.now()}-profileImg.webp`;
        await sharp(req.file.buffer)
          .resize(1200, 1200)
          .webp({ quality: 95 })
          .toFile(`uploads/images/users/${fileName}`);

        req.body.profileImg = fileName;
      }
      next();
    }
  );
}

const userService = new UserService();
export default userService;
