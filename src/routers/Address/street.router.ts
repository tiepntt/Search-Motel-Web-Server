import * as express from "express";
import { StreetController } from "../../controllers/Address/street.controller";
let streetRouter = express.Router();
streetRouter
  .get("/id=:id", StreetController.getById)
  .get("/getAll/:districtId", StreetController.getAllByDistrictId)
  .post("/create", StreetController.create)
  .put("/update", StreetController.update)
  .delete("/delete", StreetController.remove);
export default streetRouter;
