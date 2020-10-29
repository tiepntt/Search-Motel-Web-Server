import contactRouter from "./User/contact.router";
import roleRouter from "./User/role.router";
import userRouter from "./User/user.router";

export const router = (app) => {
  app.use("/user", userRouter);
  app.use("/role", roleRouter);
  app.use("/contact", contactRouter);
};
