import * as express from "express";
import { DistrictController } from "../../controllers/Address/district.controller";

let districtRouter = express.Router();
districtRouter
  .get("/getAll/:provinceId", DistrictController.getAllByProvinceId)
  .get("/:districtId", DistrictController.getById)
  .post("/create", DistrictController.create)
  .put("/update", DistrictController.update)
  .delete("/delete", DistrictController.remove);

export default districtRouter;
