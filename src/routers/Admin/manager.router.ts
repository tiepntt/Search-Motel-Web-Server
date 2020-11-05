import * as express from "express";
import { ManagerController } from "../../controllers/Admin/manager.controller";

let ManagerRouter = express.Router();
ManagerRouter.get("/employments", ManagerController.getEmployments);
ManagerRouter.post("/employments/create", ManagerController.createEmployment);
ManagerRouter.get("/newOwner", ManagerController.getAllNewUser);
ManagerRouter.post("/assignUser", ManagerController.assignUserToEmployment);
ManagerRouter.delete(
  "/removeUser/userId=:userId",
  ManagerController.removeUser
);

export default ManagerRouter;
