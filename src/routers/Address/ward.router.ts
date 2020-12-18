import * as express from "express";
import { WardController } from "../../controllers/Address/ward.controller";

let wardRouter = express.Router();
wardRouter
  .get("/:wardId", WardController.getById)
  .get("/getAll/:districtId", WardController.getAllByDistrictId)
  .post("/create", WardController.create)
  .put("/udpate", WardController.udpate)
  .delete("/delete", WardController.remove);

export default wardRouter;
