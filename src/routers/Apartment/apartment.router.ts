import * as express from "express";
import { ManagerController } from "../../controllers/Admin/manager.controller";
import { ApartmentController } from "../../controllers/Apartment/apartment.controller";
import { ApartmentDetailController } from "../../controllers/Apartment/apartmentDetail.controller";
import { ImageApartmentController } from "../../controllers/image/imageApartment.controller";
import {
  CheckRole,
  CheckToken,
} from "../../middleware/authenticate.middleware";
import { uploadMiddleware } from "../../middleware/upload.middleware";
import { uploadApartment } from "../../services/upload/upload";
import contactRouter from "../User/contact.router";
// import { uploadApartment } from "../../services/upload/upload.cloudinary";

let apartmentRouter = express.Router();
apartmentRouter
  .get(
    "/all",
    CheckToken,
    CheckRole.roleApproveApartment,
    ManagerController.getALlApartment
  )
  .get("/allOfUser", CheckToken, ApartmentController.getAllApartmentByUserId)
  .post(
    "/create",
    CheckToken,
    CheckRole.RoleIsCreateApartment,
    uploadApartment.single("avatar"),
    ApartmentController.create
  )
  .post("/detail/create", ApartmentDetailController.create)
  .post(
    "/upload",
    CheckToken,
    uploadApartment.single("image"),
    uploadMiddleware.uploadApartmentImg,
    ImageApartmentController.add
  )
  .put("/extend", CheckToken, ApartmentController.extendApartment)
  .delete("/upload", CheckToken, ImageApartmentController.remove)
  .put("/restore", ApartmentController.restore)
  .put("/updateStatus", CheckToken, ApartmentController.changeStatus)
  .delete("/delete", ApartmentController.remove)
  .get("/deleted", ApartmentController.getRemoved)

  .get("/userId=:userId", ApartmentController.getAllByUserId)
  .get("/detail/:apartmentId", ApartmentDetailController.getByApartmentId)
  .delete("/detail/:id", ApartmentDetailController.remove)
  .get("/hobby", CheckToken, ApartmentController.getHobby)
  .post("/hobby", CheckToken, ApartmentController.saveToHobby)
  .delete("/hobby/:apartmentId", CheckToken, ApartmentController.removeToHobby);

export default apartmentRouter;
