import { plainToClass } from "class-transformer";
import { getRepository } from "typeorm";
import { HandelStatus } from "../../config/HandelStatus";
import { ApartmentReviewInputDto } from "../../dto/Apartment/apartmentReivew.dto";
import { Apartment } from "../../entity/apartment/apartment";
import { ApartmentReview } from "../../entity/apartment/apartmentReview";
import { User } from "../../entity/user/User";
import { mapObject } from "../../utils/map";

const create = async (input: ApartmentReviewInputDto) => {
  if (!input || !input.star || !input.userId || !input.apartmentId)
    return HandelStatus(400);
  let reviewRepo = getRepository(ApartmentReview);
  let userRepo = getRepository(User);
  let apartmentRepo = getRepository(Apartment);
  let user = await userRepo.findOne(input.userId);
  if (!user) return HandelStatus(404, "User not Found");
  let apartment = await apartmentRepo.findOne(input.apartmentId);
  if (!apartment) return HandelStatus(404, "Apartment not Found");
  let review = plainToClass(ApartmentReview, input);
  review.star = review.star >= 5 ? 5 : review.star;
  review.star = review.star <= 1 ? 1 : review.star;
  review.apartment = apartment;
  review.user = user;
  try {
    await reviewRepo.save(review);
    return HandelStatus(200);
  } catch (e) {
    return HandelStatus(500, e.name);
  }
};
const update = async (input: ApartmentReviewInputDto) => {
  if (!input || !input.id) return HandelStatus(400);
  let apartmentReviewRepo = getRepository(ApartmentReview);
  let review = await apartmentReviewRepo.findOne(input.id);
  if (!review) return HandelStatus(404);
  review = mapObject(review, input);
  review.star = review.star >= 5 ? 5 : review.star;
  review.star = review.star <= 1 ? 1 : review.star;
  try {
    await apartmentReviewRepo.update(input.id, review);
    return HandelStatus(200);
  } catch (e) {
    return HandelStatus(500, e);
  }
};
const remove = async (id: number) => {};
const getAllByApartmentId = async (apartmentId: number) => {
  let reviewRepo = getRepository(ApartmentReview);
  let apartment = await getRepository(Apartment).findOne(apartmentId || -1);
  if (!apartment) return HandelStatus(404, "Not Found Apartment");
  let reviews = await reviewRepo.find({ apartment: apartment });
  return HandelStatus(200, null, reviews);
};
const getAllNotApprove = async (userId: number) => {};
const approveReview = async (id: number) => {};
export const ApartmentReviewService = {
  create,
  update,
  remove,
  getAllByApartmentId,
  getAllNotApprove,
  approveReview,
};
