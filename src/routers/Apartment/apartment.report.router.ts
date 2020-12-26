import * as express from "express";
import { ApartmentReportController } from "../../controllers/Apartment/apartment.report.controller";
import { CheckToken } from "../../middleware/authenticate.middleware";

let apartmentReportRouter = express.Router();
apartmentReportRouter
  .post("/", ApartmentReportController.create)
  .get("/Id=:id", ApartmentReportController.getById);

export default apartmentReportRouter;
