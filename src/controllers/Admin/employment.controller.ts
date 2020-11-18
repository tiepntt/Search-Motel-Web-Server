import { HandelStatus } from "../../config/HandelStatus";
import { ApartmentService } from "../../models/Apartment/apartment.model";
import { UserService } from "../../models/User/user.model";

const approveApartment = async (req, res) => {
  let userId = res.locals.userId;
  let id = req.body.apartmentId;
  let result = await ApartmentService.approveApartment(id, userId);
  return res.send(result);
};
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
  approveApartment,
};
