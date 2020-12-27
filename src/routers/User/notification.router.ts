import * as express from "express";
import { ContactController } from "../../controllers/User/contact.controller";
import { NotificationApartmentController } from "../../controllers/User/notification.controller";

let notificationRouter = express.Router();
notificationRouter
  .get("/getAll", NotificationApartmentController.getAll)
  .get("/getNew", NotificationApartmentController.getNews)
  .post("/seen", NotificationApartmentController.seen);

export default notificationRouter;
