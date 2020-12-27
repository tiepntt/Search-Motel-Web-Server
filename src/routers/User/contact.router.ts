import * as express from "express";
import { ContactController } from "../../controllers/User/contact.controller";
import { CheckToken } from "../../middleware/authenticate.middleware";

let contactRouter = express.Router();
contactRouter
  .get("/", CheckToken, ContactController.getAll)
  .get("/userId?=:id", ContactController.getByUserId)
  .post("/create", ContactController.create)
  .put("/update", ContactController.update)
  .delete("/delete", ContactController.remove);

export default contactRouter;
