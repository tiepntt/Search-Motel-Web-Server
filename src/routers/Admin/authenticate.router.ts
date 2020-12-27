import * as express from "express";
import { AuthenticateController } from "../../controllers/Admin/authenticate.controller";

let AuthenticateRouter = express.Router();
AuthenticateRouter.post("/login", AuthenticateController.login);
AuthenticateRouter.post("/logout", AuthenticateController.logOut);
AuthenticateRouter.post("/register", AuthenticateController.register);
AuthenticateRouter.put("/resetPassword", AuthenticateController.ResetPassword);

export default AuthenticateRouter;
