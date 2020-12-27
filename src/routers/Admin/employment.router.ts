import * as express from "express";
import { EmploymentController } from "../../controllers/Admin/employment.controller";
import { ApartmentController } from "../../controllers/Apartment/apartment.controller";
import { CheckRole } from "../../middleware/authenticate.middleware";

let EmploymentRouter = express.Router();
EmploymentRouter.get("/getUsers/", EmploymentController.getUserOfEmployment)
  .get("/apartmentNeedApprove", EmploymentController.getAllApartmentApproveYet)
  .post(
    "/approve",
    CheckRole.roleApproveApartment,
    EmploymentController.approveApartment
  )
  .get("/reviews", EmploymentController.getAllReviewApartmentApproveYet)
  .get(
    "/reviews/apartmentId=:id",
    EmploymentController.getAllReviewApproveYetByApartmentId
  )
  .post("/reviews/approve", EmploymentController.approveReview)
  .delete("/reviews/remove/:id", EmploymentController.removeReview)
  .get("/reports", EmploymentController.getAllReportApproveYet)
  .post("/report/approve", EmploymentController.approveReport)
  .delete("/report/remove/:id", EmploymentController.removeReport)
  .delete("/apartment", EmploymentController.removeApartment)
  .get("/apartment", EmploymentController.getAllApartmentApproveByUser)
  .put("/apartment", EmploymentController.restoreApartment)
  .get("/listNew", EmploymentController.getCountListNew)
  .get("/max", EmploymentController.getListApartmentViewMax);

export default EmploymentRouter;
