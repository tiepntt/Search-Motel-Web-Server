import * as express from "express";
import { ApartmentController } from "../../controllers/Apartment/apartment.controller";
import { ApartmentDetailController } from "../../controllers/Apartment/apartmentDetail.controller";
import { ImageApartmentController } from "../../controllers/image/imageApartment.controller";
import { uploadApartment } from "../../services/upload/upload";
// import { uploadApartment } from "../../services/upload/upload.cloudinary";

let apartmentRouter = express.Router();
apartmentRouter
  .post("/create", uploadApartment.single("avatar"), ApartmentController.create)
  .post(
    "/detail/create",
    uploadApartment.array("images", 10),
    ImageApartmentController.createMany,
    ApartmentDetailController.create
  )
  .get("/", ApartmentController.getAll)
  .get(
    "/detail/apartmentId=:apartmentId",
    ApartmentDetailController.getByApartmentId
  )
  .delete("/detail/:id", ApartmentDetailController.remove);

export default apartmentRouter;
