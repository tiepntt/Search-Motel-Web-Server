import * as express from "express";
import { EmploymentController } from "../../controllers/Admin/employment.controller";
import { ManagerController } from "../../controllers/Admin/manager.controller";
import { ApartmentController } from "../../controllers/Apartment/apartment.controller";
import { UserController } from "../../controllers/User/user.controller";

let searchRouter = express.Router();
searchRouter
  .get("/all", ManagerController.getALlApartment)
  .get("/user", ApartmentController.getAllByUserId)
  .get("/profileUser/:id", UserController.getById)
  .get("/listCountByDistrict", EmploymentController.getCountApartmentDistrict)
  .get("/listCountByType", EmploymentController.getCountApartmentByType)
  .get("/", ApartmentController.getAll);
export default searchRouter;
