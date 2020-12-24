import * as express from "express";
import { EmploymentController } from "../../controllers/Admin/employment.controller";
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
  .get("/report", EmploymentController.getReportByUserId)
  .delete("/apartment", EmploymentController.removeApartment)
  .get("/apartment", EmploymentController.getAllApartmentApproveByUser)
  .put("/apartment", EmploymentController.restoreApartment);

export default EmploymentRouter;
