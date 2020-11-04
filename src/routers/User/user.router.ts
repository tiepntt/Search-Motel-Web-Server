import * as express from "express";
import { AvatarUserController } from "../../controllers/image/avatarUser.controller";
import { UserController } from "../../controllers/User/user.controller";

import { uploadAvatarUser } from "../../services/upload/upload";
// import { uploadAvatarUser } from "../../services/upload/upload.cloudinary";

let userRouter = express.Router();
userRouter.get("/", UserController.getAll);
userRouter.get("/:id", UserController.getById);
// userRouter.post("/create", UserController.create);
userRouter.put("/update", UserController.update);
userRouter.post(
  "/changeAvatar",
  uploadAvatarUser.single("avatar"),
  AvatarUserController.create,
  UserController.changeAvatar
);

export default userRouter;
