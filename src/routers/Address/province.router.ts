import * as express from "express";
import { ProvinceController } from "../../controllers/Address/province.controller";

let provinceRouter = express.Router();
provinceRouter
  .get("/", ProvinceController.getAll)
  .get("/id=:id", ProvinceController.getById)
  .put("/", ProvinceController.update)
  .post("/create", ProvinceController.create);

export default provinceRouter;
