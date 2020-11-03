import * as express from "express";
import { ContactController } from "../../controllers/User/contact.controller";

let contactRouter = express.Router();
contactRouter
  .get("/", ContactController.getAll)
  .get("/userId?=:id", ContactController.getByUserId)
  .post("/create", ContactController.create)
  .put("/update", ContactController.update)
  .delete("/delete", ContactController.remove);

export default contactRouter;
