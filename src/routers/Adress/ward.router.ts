import * as express from "express";
import { WardController } from "../../controllers/Adress/ward.controller";

let wardRouter = express.Router();
wardRouter
  .get("/districtId=:districtId", WardController.getAllByDistrictId)
  .post("/create", WardController.create);

export default wardRouter;
