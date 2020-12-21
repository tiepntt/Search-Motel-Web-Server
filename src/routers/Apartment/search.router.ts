import * as express from "express";
import { ApartmentController } from "../../controllers/Apartment/apartment.controller";

let searchRouter = express.Router();
searchRouter.get("/", ApartmentController.getAll);
export default searchRouter;
