import { plainToClass } from "class-transformer";
import { HandelStatus } from "../../config/HandelStatus";
import { UserAssignDto, UserInputDto } from "../../dto/User/user.dto";
import { UserService } from "../../models/User/user.model";

const getEmployments = async (req, res) => {
  let userId = res.locals.userId;
  let result = await UserService.getEmployments(userId);
  return res.send(result);
};
const createEmployment = async (req, res) => {
  let userId = res.locals.userId;
  let user = req.body.user;
  if (!user) return res.send(HandelStatus(400));
  let userInput = plainToClass(UserInputDto, user, {
    excludeExtraneousValues: true,
  });
  userInput.managerId = userId || null;
  userInput.isApprove = true;
  let result = await UserService.create(userInput);
  return res.send(result);
};
const assignUserToEmployment = async (req, res) => {
  let inputRequest = req.body.input;
  if (!inputRequest) return HandelStatus(400);
  let input = plainToClass(UserAssignDto, inputRequest);
  let result = await UserService.assignUserToAdmin(input);
  return res.send(result);
};
//approve
const removeUser = async (req, res) => {
  let userId = req.params.userId;
  let result = await UserService.remove(userId);
  return res.send(result);
};
const getAllNewUser = async (req, res) => {
  let result = await UserService.getAllNewOwner();
  return res.send(result);
};
export const ManagerController = {
  getEmployments,
  assignUserToEmployment,
  removeUser,
  getAllNewUser,
  createEmployment,
};
