import userRouter from "./User/user.router";

export const router = (app) => {
  app.use("/user", userRouter);
};
