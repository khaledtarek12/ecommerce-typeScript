import { Request, Response, NextFunction } from "express";
import sharp from "sharp";
import expressAsyncHandler from "express-async-handler";
import { User } from "./user.interface";
import UserModel from "./user.module";
import bcrypt from "bcrypt";
import refactorService from "../../refator.service";
import { uploadSingleFile } from "../../middlewares/uploadFiles.middleware";
import ApiErrors from "../../utils/apiErrors";

class UserService {
  getAll = refactorService.getAll<User>(UserModel);

  createOne = refactorService.createOne<User>(UserModel);

  getOne = refactorService.getOne<User>(UserModel);

  updateOne = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const document: User | null = await UserModel.findByIdAndUpdate(
        id,
        {
          name: req.body.name,
          email: req.body.email,
          profileImg: req.body.profileImg,
          role: req.body.role,
          phone: req.body.phone,
        },
        { new: true }
      );
      if (!document) return next(new ApiErrors(req.__("not_found"), 404));
      res.status(201).json({ data: document });
    }
  );

  updatePassword = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const document: User | null = await UserModel.findByIdAndUpdate(
        id,
        {
          password: await bcrypt.hash(req.body.password, 12),
        },
        { new: true }
      );
      if (!document) return next(new ApiErrors(req.__("not_found"), 404));
      res.status(201).json({ data: document });
    }
  );

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
