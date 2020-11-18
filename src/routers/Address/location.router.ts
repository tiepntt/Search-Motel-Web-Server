import * as express from "express";
import { LocationController } from "../../controllers/Address/location.controller";

let locationRouter = express.Router();
locationRouter
    .get("/provinceId=:provinceId", LocationController.getAllByProvinceId)
    .get("/districtId=:districtId", LocationController.getAllByDistrictId)
    .get("/id=:id", LocationController.getById)
    .post("/create", LocationController.create)
    .put("/update", LocationController.update)
    .delete("/delete/id=:id", LocationController.remove);
    
export default locationRouter;