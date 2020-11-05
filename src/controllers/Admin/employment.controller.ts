import { HandelStatus } from "../../config/HandelStatus";
import { ApartmentService } from "../../models/Apartment/apartment.model";
import { UserService } from "../../models/User/user.model";

const approveDepartment = async (req, res) => {};
const getUserOfEmployment = async (req, res) => {
  let userId = req.params.Id;
  let result = await UserService.getUsersByEmployment(userId);
  return res.send(result);
};
const getAllApartmentApproveYet = async (req, res) => {
  let userId = res.locals.userId;
  let result = await ApartmentService.getNeedApproveByAdminId(userId || -1);
  return res.send(result);
};
export const EmploymentController = {
  getUserOfEmployment,
  getAllApartmentApproveYet,
};
