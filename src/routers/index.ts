import districtRouter from "./Adress/district.router";
import provinceRouter from "./Adress/province.router";
import wardRouter from "./Adress/ward.router";
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
};
