import * as express from "express";
import { EmploymentController } from "../../controllers/Admin/employment.controller";

let EmploymentRouter = express.Router();
EmploymentRouter.get(
  "/getUsers/userId=:Id",
  EmploymentController.getUserOfEmployment
).get("/apartmentNeedApprove", EmploymentController.getAllApartmentApproveYet);

export default EmploymentRouter;
