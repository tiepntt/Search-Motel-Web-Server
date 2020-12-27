import { plainToClass } from "class-transformer";
import { getRepository, Like, MoreThan } from "typeorm";
import { HandelStatus } from "../../config/HandelStatus";
import {
  ApartmentListGetDto,
  ApartmentReviewGetDto,
  ApartmentReviewInputDto,
} from "../../dto/Apartment/apartmentReivew.dto";
import { Apartment } from "../../entity/apartment/apartment";
import { ApartmentReview } from "../../entity/apartment/apartmentReview";
import { Role } from "../../entity/user/Role";
import { User } from "../../entity/user/User";
import { addDate } from "../../utils/dateTime";
import { mapObject } from "../../utils/map";
import { NotificationApartmentService } from "../Notification/notification.apartment.model";

const create = async (input: ApartmentReviewInputDto) => {
  if (!input || !input.userId || !input.apartmentId) return HandelStatus(400);
  let reviewRepo = getRepository(ApartmentReview);
  let userRepo = getRepository(User);
  let apartmentRepo = getRepository(Apartment);
  let user = await userRepo.findOne(input.userId);
  if (!user) return HandelStatus(404, "User not Found");
  let apartment = await apartmentRepo.findOne({
    relations: ["user"],
    where: { id: input.apartmentId },
  });
  if (!apartment) return HandelStatus(404, "Apartment not Found");
  let review = plainToClass(ApartmentReview, input);
  review.star = review.star >= 5 ? 5 : review.star;
  review.star = review.star <= 1 ? 1 : review.star;
  review.apartment = apartment;
  review.user = user;
  try {
    await reviewRepo.save(review);
    let roles = await getRepository(Role).find({
      where: [{ code: "A" }, { code: "MNG" }],
    });

    let userSubscribe = await getRepository(User).find({
      relations: ["role"],
      where: [
        {
          role: roles[0],
        },
        { role: roles[1] },
      ],
    });
    await NotificationApartmentService.create({
      context: user.name + " đã bình luận bài đăng của " + apartment.user.name,
      apartment: apartment,
      userCreate: user,
      userSubscribe: userSubscribe,
    });
    return HandelStatus(
      200,
      "Thành công! Bình luận sẽ được hiển thị sau khi được phê duyệt."
    );
  } catch (e) {
    console.log(e);

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
    return HandelStatus(
      200,
      "Thành công! Bình luận sẽ được hiển thị sau khi được phê duyệt."
    );
  } catch (e) {
    return HandelStatus(500, e);
  }
};
const remove = async (id: number) => {
  let reviewRepo = getRepository(ApartmentReview);
  let review = await reviewRepo.findOne(id);
  if (!review) return HandelStatus(404, "Đã  xóa");
  try {
    await reviewRepo.remove(review);
    return HandelStatus(200, "Đã xóa");
  } catch (e) {
    return HandelStatus(500);
  }
};
const getAllByApartmentId = async (
  apartmentId: number,
  take?: number,
  skip?: number
) => {
  try {
    let takeOffset = parseInt(take.toString());
    let skipOffset = parseInt(skip.toString());

    let reviewRepo = getRepository(ApartmentReview);
    let apartment = await getRepository(Apartment).findOne(apartmentId || -1);
    if (!apartment) return HandelStatus(404, "Not Found Apartment");
    let reviews = await reviewRepo.findAndCount({
      relations: ["user", "user.avatar"],
      where: {
        isApprove: true,
        apartment: apartmentId,
      },
      order: {
        create_at: "DESC",
      },
      take: takeOffset || 5,
      skip: skipOffset || 0,
    });

    let result = plainToClass(ApartmentReviewGetDto, reviews[0], {
      excludeExtraneousValues: true,
    });
    return HandelStatus(200, null, { data: result, count: reviews[1] });
  } catch (e) {
    return HandelStatus(500, e);
  }
};
const getAllNeedApproveByApartmentId = async (apartmentId: number) => {
  let reviewRepo = getRepository(ApartmentReview);
  let apartment = await getRepository(Apartment).findOne(apartmentId || -1);
  if (!apartment) return HandelStatus(404, "Not Found Apartment");
  let reviews = await reviewRepo.find({
    apartment: apartment,
    isApprove: false,
  });
  return HandelStatus(200, null, reviews);
};
const getAllApproveYet = async (
  userId: number,
  key?: string,
  take?: number,
  skip?: number
) => {
  let apartmentReviewRepo = getRepository(ApartmentReview);
  let reviews = await apartmentReviewRepo.findAndCount({
    where: {
      content: Like(`%${key || ""}%`),
      isApprove: false,
    },

    relations: ["apartment", "user", "apartment.user", "user.avatar"],
    take: take || 5,
    skip: skip || 0,
    order: {
      create_at: "DESC",
    },
  });
  try {
    let result = plainToClass(ApartmentReviewGetDto, reviews[0], {
      excludeExtraneousValues: true,
    });
    return HandelStatus(200, null, { data: result, count: reviews[1] });
  } catch (e) {
    return HandelStatus(500);
  }
};
const approveReview = async (id: number, userId: number) => {
  let user = await getRepository(User).findOne(userId || -1);
  if (!user) return HandelStatus(404, "user not found");
  let review = await getRepository(ApartmentReview).findOne({
    where: { id: id },
    relations: ["user", "apartment", "apartment.user"],
  });
  if (!review) return HandelStatus(404);
  review.isApprove = true;
  review.userApprove = user;
  try {
    await getRepository(ApartmentReview).save(review);
    await NotificationApartmentService.create({
      context: review.user.name + " đã bình luận về bài viết của bạn.",
      apartment: review.apartment,
      userCreate: user,
      userSubscribe: [review.apartment.user],
    });
    return HandelStatus(200);
  } catch (e) {
    return HandelStatus(500, e);
  }
};
const getNew = async () => {
  let date = addDate(new Date(), -30);
  let comment = await getRepository(ApartmentReview).count({
    where: {
      create_at: MoreThan(date),
    },
  });
  return comment;
};
export const ApartmentReviewService = {
  getNew,
  create,
  update,
  remove,
  getAllByApartmentId,
  getAllApproveYet,
  approveReview,
  getAllNeedApproveByApartmentId,
};
