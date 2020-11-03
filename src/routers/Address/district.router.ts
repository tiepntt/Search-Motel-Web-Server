import * as express from "express";
import { DistrictController } from "../../controllers/Address/district.controller";

let districtRouter = express.Router();
districtRouter
  .get("/provinceId=:provinceId", DistrictController.getAllByProvinceId)
  .get("/districtId=:districtId", DistrictController.getById)
  .post("/create", DistrictController.create)
  .put("/update", DistrictController.update)
  .delete("/delete", DistrictController.remove);

export default districtRouter;
