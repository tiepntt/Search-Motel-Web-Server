 import * as express from "express";
import { HintController } from "../../controllers/Address/hint.controller";

 let hintRouter = express.Router();
 hintRouter
   .get("/", HintController.getByKey)

 export default hintRouter;
