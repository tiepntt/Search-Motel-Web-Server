import districtRouter from "./Address/district.router";
import provinceRouter from "./Address/province.router";
import streetRouter from "./Address/street.router";
import wardRouter from "./Address/ward.router";
import initAddressRouter from "./InitData/init-address.router";
import contactRouter from "./User/contact.router";
import roleRouter from "./User/role.router";
import userRouter from "./User/user.router";

export const router = (app) => {
  app.use("/user", userRouter);
  app.use("/role", roleRouter);
  app.use("/contact", contactRouter);
  app.use("/province", provinceRouter);
  app.use("/district", districtRouter);
  app.use("/ward", wardRouter);
  app.use("/street", streetRouter);
  app.use("/init-data/address", initAddressRouter);
};
