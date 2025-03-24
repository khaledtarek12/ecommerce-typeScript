import { Router } from "express";
import userService from "./user.service";
import userValidation from "./user.validators";
const UserRouter: Router = Router();

UserRouter.route("/")
  .get(userService.getAll)
  .post(
    userService.uploadImages,
    userService.saveImage,
    userValidation.createUser,
    userService.createOne
  );

UserRouter.route("/change-password/:id").put(
  userValidation.updateUserPassword,
  userService.updatePassword
);

UserRouter.route("/:id")
  .get(userValidation.getUser, userService.getOne)
  .put(
    userService.uploadImages,
    userService.saveImage,
    userValidation.updateUser,
    userService.updateOne
  )
  .delete(userValidation.deleteUser, userService.deleteOne);

export default UserRouter;
