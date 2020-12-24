import * as express from "express";
import { PriceController } from "../../controllers/Payment/price.controller";
import {
  CheckRole,
  CheckToken,
} from "../../middleware/authenticate.middleware";

let PriceRouter = express.Router();
PriceRouter.get("/", PriceController.getAll).post(
  "/creat",
  CheckToken,
  CheckRole.roleManager,
  PriceController.create
);

export default PriceRouter;
