import * as express from "express";
import { ContactController } from "../../controllers/User/contact.controller";
import { CheckToken } from "../../middleware/authenticate.middleware";

let contactRouter = express.Router();
contactRouter
  .get("/", CheckToken, ContactController.getAll)
  .get("/userId?=:id", CheckToken, ContactController.getByUserId)
  .post("/create", ContactController.create)
  .put("/update", CheckToken, ContactController.update)
  .delete("/delete", CheckToken, ContactController.remove);

export default contactRouter;
