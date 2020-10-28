import * as express from "express";
import { UserController } from "../../controllers/User/user.controller";
let userRouter = express.Router();
userRouter.get("/", UserController.getAll);
userRouter.post("/create", UserController.create);

export default userRouter;
