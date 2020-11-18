import { HandelStatus } from "../../config/HandelStatus";
import { ApartmentService } from "../../models/Apartment/apartment.model";
import { ApartmentReportService } from "../../models/Apartment/apartment.report.model";
import { ApartmentReviewService } from "../../models/Apartment/apartment.review.model";
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
const getAllReviewApartmentApproveYet = async (req, res) => {
  let userId = res.locals.userId;
  let result = await ApartmentReviewService.getAllApproveYet(userId || -1);
  return res.send(result);
};
const getAllReviewApproveYetByApartmentId = async (req, res) => {
  let id = req.params.id;
  let result = await ApartmentReviewService.getAllNeedApproveByApartmentId(
    id || -1
  );
  return res.send(result);
};
const approveReview = async (req, res) => {
  let id = req.body.reviewId;
  let userId = res.locals.userId;
  let result = await ApartmentReviewService.approveReview(id, userId);
  return res.send(result);
};

const getReportByUserId = async (req, res) => {
  let userId = res.locals.userId;
  let result = await ApartmentReportService.getAllByUserAdmin(userId);
  return res.send(result);
};
const removeApartment = async (req, res) => {
  let userId = res.locals.userId;
  let id = req.body.apartmentId;
  let result = await ApartmentService.remove(id, userId);
  return res.send(result);
};
const getAllApartmentApproveByUser = async (req, res) => {
  let take = req.params.take || 10;
  let skip = req.params.skip || 0;
  let userId = res.locals.userId;
  let result = await ApartmentService.getAllByEmploymentId(userId, take, skip);
  return res.send(result);
};
const restoreApartment = async (req, res) => {
  let id = req.body.apartmentId;
  let result = await ApartmentService.restoreById(id);
  return res.send(result);
};
export const EmploymentController = {
  getUserOfEmployment,
  getAllApartmentApproveYet,
  approveApartment,
  getAllReviewApartmentApproveYet,
  getAllReviewApproveYetByApartmentId,
  approveReview,
  getReportByUserId,
  removeApartment,
  getAllApartmentApproveByUser,
  restoreApartment,
};
