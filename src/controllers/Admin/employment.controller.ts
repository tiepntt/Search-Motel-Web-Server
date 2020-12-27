import { HandelStatus } from "../../config/HandelStatus";
import { User } from "../../entity/user/User";
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
  let { take, skip, key } = req.query;
  let userId = res.locals.userId;
  let result = await UserService.getUsersByEmployment(userId, take, skip, key);
  return res.send(result);
};

const getAllApartmentApproveYet = async (req, res) => {
  let userId = res.locals.userId;
  let result = await ApartmentService.getNeedApproveByAdminId(userId || -1);
  return res.send(result);
};
const getAllReviewApartmentApproveYet = async (req, res) => {
  let { skip, take, key } = req.query;
  let result = await ApartmentReviewService.getAllApproveYet(
    0,
    key,
    take,
    skip
  );
  return res.send(result);
};
const getAllReportApproveYet = async (req, res) => {
  let { skip, take, key } = req.query;
  let result = await ApartmentReportService.getAllApproveYet(key, take, skip);
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
const approveReport = async (req, res) => {
  let id = req.body.reviewId;
  let userId = res.locals.userId;
  let result = await ApartmentReportService.approveReport(id);
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
const getListApartmentViewMax = async (req, res) => {
  let { take } = req.query;
  let result = await ApartmentService.getMaxViews(take);
  return res.send(result);
};
const removeReview = async (req, res) => {
  let id = req.params.id;
  let result = await ApartmentReviewService.remove(id);
  return res.send(result);
};
const removeReport = async (req, res) => {
  let id = req.params.id;
  let result = await ApartmentReportService.remove(id);
  return res.send(result);
};
const getCountApartmentDistrict = async (req, res) => {
  let result = await ApartmentService.getApartmentListCount();
  return res.send(result);
};
const getCountApartmentByType = async (req, res) => {
  let result = await ApartmentService.getApartmentListCountByType();
  return res.send(result);
};
const getCountListNew = async (req, res) => {
  let apartmentCount = await ApartmentService.getNew();
  let commentCount = await ApartmentReviewService.getNew();
  let userCount = await UserService.getNews();
  let deadlineCount = await ApartmentService.getDeadline();
  return res.send(
    HandelStatus(200, null, {
      apartmentCount,
      commentCount,
      userCount,
      deadlineCount,
    })
  );
};
export const EmploymentController = {
  getCountListNew,
  getCountApartmentByType,
  getCountApartmentDistrict,
  getUserOfEmployment,
  getAllApartmentApproveYet,
  approveApartment,
  getAllReviewApartmentApproveYet,
  getAllReviewApproveYetByApartmentId,
  approveReview,
  removeReview,
  approveReport,
  removeReport,
  getAllReportApproveYet,
  getReportByUserId,
  removeApartment,
  getAllApartmentApproveByUser,
  restoreApartment,
  getListApartmentViewMax,
};
