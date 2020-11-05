import * as express from "express";
import { ManagerController } from "../../controllers/Admin/manager.controller";

let ManagerRouter = express.Router();
ManagerRouter.get("/employments", ManagerController.getEmployments);
ManagerRouter.post("/employments/create", ManagerController.createEmployment);

export default ManagerRouter;
