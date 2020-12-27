import * as express from "express";
import { ApartmentReviewController } from "../../controllers/Apartment/apartmentReivew.controller";

let apartmentReviewRouter = express.Router();
apartmentReviewRouter
  
  .post("/create", ApartmentReviewController.create)
  .put("/update", ApartmentReviewController.update);
export default apartmentReviewRouter;
