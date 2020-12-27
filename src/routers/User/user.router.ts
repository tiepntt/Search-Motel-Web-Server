import * as express from "express";
import { AvatarUserController } from "../../controllers/image/avatarUser.controller";
import { UserController } from "../../controllers/User/user.controller";
import { CheckRole } from "../../middleware/authenticate.middleware";

import { uploadAvatarUser } from "../../services/upload/upload";
// import { uploadAvatarUser } from "../../services/upload/upload.cloudinary";

let userRouter = express
  .Router()
  .get("/", CheckRole.roleApproveApartment, UserController.getAll)
  .get("/account", UserController.getAccount)
  .get("/profile", UserController.getProfile)
  .get("/:id", UserController.getById)
  .put("/update", UserController.update)
  .put(
    "/changeAvatar",
    uploadAvatarUser.single("avatar"),
    AvatarUserController.create,
    UserController.changeAvatar
  )
  .put("/changePassWord", UserController.changePassWord);

export default userRouter;
