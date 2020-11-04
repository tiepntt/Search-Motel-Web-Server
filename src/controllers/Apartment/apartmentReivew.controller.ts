import { plainToClass } from "class-transformer";
import { ETIMEDOUT } from "constants";
import { HandelStatus } from "../../config/HandelStatus";
import { ApartmentReviewInputDto } from "../../dto/Apartment/apartmentReivew.dto";
import { ApartmentType } from "../../entity/apartment/apartmentType";
import { ApartmentService } from "../../models/Apartment/apartment.model";
import { ApartmentReviewService } from "../../models/Apartment/apartment.review.model";

const create = async (req, res) => {
  let review = req.body.review;
  if (!review) return res.send(HandelStatus(400));
  review = plainToClass(ApartmentReviewInputDto, review);
  review.userId = req.body.userId;
  let result = await ApartmentReviewService.create(review);
  return res.send(result);
};
const update = async (req, res) => {
  let review = req.body.review;
  if (!review) return res.send(HandelStatus(400));
  review = plainToClass(ApartmentReviewInputDto, review);
  let result = await ApartmentReviewService.update(review);
  return res.send(result);
};
const getAllByApartmentId = async (req, res) => {
  let apartmentId = req.params.apartmentId;
  let result = await ApartmentReviewService.getAllByApartmentId(apartmentId);
  return res.send(result);
};
export const ApartmentReviewController = {
  create,
  update,
  getAllByApartmentId,
};
