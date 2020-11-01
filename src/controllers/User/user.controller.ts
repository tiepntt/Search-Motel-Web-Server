import { UserService } from "../../models/User/user.model";

const getAll = async (req, res) => {
  let users = await UserService.getAll();
  res.send(users);
};
const create = async (req, res) => {
  let userReq = req.body.user;
  let result = await UserService.create(userReq);
  res.send(result);
};
const getById = async (req, res) => {
  let id = req.params.id;
  let result = await UserService.getById(id);

  res.send(result);
};
const changeAvatar = async (req, res) => {
  let userId = req.body.userId;
  let imgId = req.body.imgId || undefined;

  let result = await UserService.changeAvatar(imgId, userId);
  return res.send(result);
};
export const UserController = { getAll, create, getById, changeAvatar };
