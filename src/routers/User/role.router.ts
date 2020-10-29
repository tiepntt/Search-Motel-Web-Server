import * as express from "express";
import { RoleController } from "../../controllers/User/role.controller";

let roleRouter = express.Router();
roleRouter.get("/", RoleController.getAll);

export default roleRouter;
