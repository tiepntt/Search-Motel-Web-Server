import * as express from "express";
import { InitAddressController } from "../../controllers/InitBySheet/init-address.controller";

let initAddressRouter = express.Router();
initAddressRouter
  .post("/province", InitAddressController.initProvinceBySheet)
  .post("/district", InitAddressController.initDistrictBySheet)
  .post("/ward", InitAddressController.initWardBySheet)
  .post("/street", InitAddressController.initStreetBySheet)
  .post("/location", InitAddressController.initLocationsBySheet);

export default initAddressRouter;
