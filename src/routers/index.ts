import { CheckRole, CheckToken } from "../middleware/authenticate.middleware";
import districtRouter from "./Address/district.router";
import locationRouter from "./Address/location.router";
import provinceRouter from "./Address/province.router";
import streetRouter from "./Address/street.router";
import wardRouter from "./Address/ward.router";
import AuthenticateRouter from "./Admin/authenticate.router";
import EmploymentRouter from "./Admin/employment.router";
import ManagerRouter from "./Admin/manager.router";
import apartmentReportRouter from "./Apartment/apartment.report.router";
import apartmentReviewRouter from "./Apartment/apartment.review.router";
import apartmentRouter from "./Apartment/apartment.router";
import apartmentTypeRouter from "./Apartment/apartment.type.router";
import searchRouter from "./Apartment/search.router";
import initAddressRouter from "./InitData/init-address.router";
import contactRouter from "./User/contact.router";
import roleRouter from "./User/role.router";
import userRouter from "./User/user.router";

export const router = (app) => {
  app.use("/user", CheckToken, userRouter);
  app.use("/role", CheckToken, roleRouter);
  app.use("/contact", CheckToken, contactRouter);
  app.use("/province", CheckToken, provinceRouter);
  app.use("/district", CheckToken, districtRouter);
  app.use("/ward", CheckToken, wardRouter);
  app.use("/street", CheckToken, streetRouter);
  app.use("/search", searchRouter);
  app.use(
    "/init-data/address",
    CheckToken,
    CheckRole.roleManager,
    initAddressRouter
  );
  app.use("/apartment", CheckToken, apartmentRouter);
  app.use("/review", CheckToken, apartmentReviewRouter);
  app.use("/report", CheckToken, apartmentReportRouter);
  app.use("/authenticate", AuthenticateRouter);
  app.use("/manager", CheckToken, CheckRole.roleManager, ManagerRouter);
  app.use("/location", locationRouter);
  app.use("/employment", CheckToken, EmploymentRouter);
  app.use("/type", apartmentTypeRouter);
};
