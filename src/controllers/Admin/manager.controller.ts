import { plainToClass } from "class-transformer";
import { HandelStatus } from "../../config/HandelStatus";
import { UserAssignDto, UserInputDto } from "../../dto/User/user.dto";
import { ApartmentService } from "../../models/Apartment/apartment.model";
import { UserService } from "../../models/User/user.model";

const getEmployments = async (req, res) => {
  let userId = res.locals.userId;
  let { take, skip, options, key } = req.query;
  let result = await UserService.getEmployments(userId, take, skip, key);
  return res.send(result);
};
const getALlApartment = async (req, res) => {
  let { take, skip, isApprove, key } = req.query;
  let result = await ApartmentService.getAllApartment(
    take,
    skip,
    isApprove,
    key
  );
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
  userInput.roleCode = "A";
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
  let { take, skip, isApprove, key } = req.query;

  let result = await UserService.getAllNewOwner({
    take: take,
    skip,
    isApprove: parseInt(isApprove),
    key,
  });
  return res.send(result);
};
export const ManagerController = {
  getEmployments,
  assignUserToEmployment,
  removeUser,
  getAllNewUser,
  createEmployment,
  getALlApartment,
};
