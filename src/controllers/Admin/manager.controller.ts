
import { plainToClass } from "class-transformer";
import { HandelStatus } from "../../config/HandelStatus";
import { UserInputDto } from "../../dto/User/user.dto";
import { User } from "../../entity/user/User";
import { UserService } from "../../models/User/user.model";

const getEmployments = async (req, res) => {
  let userId = req.body.userId;
  let result = await UserService.getEmployments(userId);
  return res.send(result);
};
const createEmployment = async (req, res) => {
  let userId = req.body.userId;
  let user = req.body.user;
  console.log(user);
  
  if (!user) return res.send(HandelStatus(400));
  let userInput = plainToClass(UserInputDto, user);
  userInput.managerId = userId || null;
  let result = await UserService.create(userInput);
  return res.send(result);
};
const assignUserToEmployment = async (req, res) => {};
//approve
const removeUser = async (req, res) => {};
const getAllNewUser = async (req, res) => {

};
export const ManagerController = {
  getEmployments,
  assignUserToEmployment,
  removeUser,
  getAllNewUser,
  createEmployment,
};
