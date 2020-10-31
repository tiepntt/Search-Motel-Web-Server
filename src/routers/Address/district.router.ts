import * as express from "express";
import { DistrictController } from "../../controllers/Address/district.controller";

let districtRouter = express.Router();
districtRouter
  .get("/provinceId=:provinceId", DistrictController.getAllByProvinceId)
  .post("/create", DistrictController.create)
  .put("/", DistrictController.udpate);

export default districtRouter;
