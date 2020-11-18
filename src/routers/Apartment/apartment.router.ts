import * as express from "express";
import { ApartmentController } from "../../controllers/Apartment/apartment.controller";
import { ApartmentDetailController } from "../../controllers/Apartment/apartmentDetail.controller";
import { ImageApartmentController } from "../../controllers/image/imageApartment.controller";
import {
  CheckRole,
  CheckToken,
} from "../../middleware/authenticate.middleware";
import { uploadApartment } from "../../services/upload/upload";
import contactRouter from "../User/contact.router";
// import { uploadApartment } from "../../services/upload/upload.cloudinary";

let apartmentRouter = express.Router();
apartmentRouter
  .post(
    "/create",
    CheckToken,
    CheckRole.RoleIsCreateApartment,
    uploadApartment.single("avatar"),
    ApartmentController.create
  )
  .post(
    "/detail/create",
    uploadApartment.array("images", 10),
    ImageApartmentController.createMany,
    ApartmentDetailController.create
  )
  .put("/restore", ApartmentController.restore)
  .delete("/delete", ApartmentController.remove)
  .get("/deleted", ApartmentController.getRemoved)
  .get("/", ApartmentController.getAll)
  .get("/userId=:userId", ApartmentController.getAllByUserId)
  .get(
    "/detail/apartmentId=:apartmentId",
    ApartmentDetailController.getByApartmentId
  )
  .delete("/detail/:id", ApartmentDetailController.remove);

export default apartmentRouter;
