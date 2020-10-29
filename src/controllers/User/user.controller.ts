import { UserDto } from "../../dto/User/userDto";
import { UserService } from "../../models/User/user.model";

const getAll = async (req, res) => {
  let users = await UserService.getAll();
  res.send(users);
};
const create = async (req, res) => {
  let userReq = req.body.user;
  let userConfig = new UserDto();
  userConfig.username = userReq.username;
  userConfig.password = userReq.password;
  userConfig.roleId = userReq.roleId;
  userConfig.userManagerCode = userReq.userManagerCode || "A";

  let result = await UserService.create(userConfig);
  res.send(result);
};
const getById = async (req, res) => {
  let id = req.params.id;
  let result = await UserService.getById(id);

  res.send(result);
};
export const UserController = { getAll, create, getById };
