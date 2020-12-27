import { plainToClass } from "class-transformer";
import { HandelStatus } from "../../config/HandelStatus";
import { ApartmentReviewInputDto } from "../../dto/Apartment/apartmentReivew.dto";
import { ApartmentReviewService } from "../../models/Apartment/apartment.review.model";

const create = async (req, res) => {
  let review = req.body.review;
  if (!review) return res.send(HandelStatus(400));
  review = plainToClass(ApartmentReviewInputDto, review);
  review.userId = res.locals.userId;
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
  let { apartmentId, skip, take } = req.query;
  let result = await ApartmentReviewService.getAllByApartmentId(
    apartmentId,
    take,
    skip
  );
  return res.send(result);
};
export const ApartmentReviewController = {
  create,
  update,
  getAllByApartmentId,
};
