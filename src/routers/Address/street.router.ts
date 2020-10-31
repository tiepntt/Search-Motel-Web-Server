import * as express from "express";
import { StreetController } from "../../controllers/Address/street.controller";
let streetRouter = express.Router();
streetRouter
  .get("/districtId=:districtId", StreetController.getAllByDistrictId)
  .get("/id=:id", StreetController.getById)
  .post("/create", StreetController.create);
export default streetRouter;
