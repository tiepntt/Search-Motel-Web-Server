import * as express from "express";
import { ManagerController } from "../../controllers/Admin/manager.controller";
import { ApartmentController } from "../../controllers/Apartment/apartment.controller";

let searchRouter = express.Router();
searchRouter
  .get("/", ApartmentController.getAll)
  .get("/all", ManagerController.getALlApartment);
export default searchRouter;
