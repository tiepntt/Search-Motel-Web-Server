import * as express from "express";
import { ContactController } from "../../controllers/User/contact.controller";

let contactRouter = express.Router();
contactRouter
  .get("/", ContactController.getAll)
  .get("/id?=:id", ContactController.getByUserId)
  .post("/", ContactController.create);

export default contactRouter;
