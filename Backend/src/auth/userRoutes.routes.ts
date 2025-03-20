import { Router } from "express";
import userService from "./userServices.service";
const UserRouter: Router = Router();

UserRouter.route("/").get(userService.getAll).post(
  userService.uploadImages,
  userService.saveImage,
  // categoriesValidation.createCategory,
  userService.createOne
);

UserRouter.route("/:id")
  .get(
    // categoriesValidation.getCategory,
    userService.getOne
  )
  .put(
    userService.uploadImages,
    userService.saveImage,
    // categoriesValidation.updateCategory,
    userService.updateOne
  )
  .delete(
    // categoriesValidation.deleteCategory,
    userService.deleteOne
  );

export default UserRouter;
