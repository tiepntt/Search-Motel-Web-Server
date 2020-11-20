import * as express from "express";
import { ApartmentTypeController } from "../../controllers/Apartment/type/apartmentType.controller";
import { KitchenTypeController } from "../../controllers/Apartment/type/kitchenType.controller";
import { ToiletTypeController } from "../../controllers/Apartment/type/ToiletType.controller";

let apartmentTypeRouter = express.Router();
apartmentTypeRouter
  .get("/apartment", ApartmentTypeController.getAll)
  .get("/kitchen", KitchenTypeController.getAll)
  .get("/toilet", ToiletTypeController.getAll);

export default apartmentTypeRouter;
