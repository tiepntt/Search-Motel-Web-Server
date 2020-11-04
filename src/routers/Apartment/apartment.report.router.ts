import * as express from "express";
import { ApartmentReportController } from "../../controllers/Apartment/apartment.report.controller";

let apartmentReportRouter = express.Router();
apartmentReportRouter
  .post("/create", ApartmentReportController.create)
  .get("/Id=:id", ApartmentReportController.getById);

export default apartmentReportRouter;
