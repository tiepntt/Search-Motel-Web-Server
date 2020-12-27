import { plainToClass } from "class-transformer";
import {
  AfterInsert,
  Any,
  FindOperator,
  getRepository,
  In,
  Raw,
} from "typeorm";
import { Alias } from "typeorm/query-builder/Alias";
import { io } from "../..";
import { HandelStatus } from "../../config/HandelStatus";
import {
  NotificationGetList,
  NotificationInput,
} from "../../dto/Notification/apartment";
import { NotificationApartment } from "../../entity/notification/Notification";
import { User } from "../../entity/user/User";
import { IoEmit } from "../../loader/soketio/constant";

const create = async (input: NotificationInput) => {
  let notification = plainToClass(NotificationApartment, input);
  try {
    await getRepository(NotificationApartment).save(notification);
    io.emit(IoEmit.NEW_NOTIFICATION);
  } catch (e) {
    console.log(e);
  }
};
const seen = async (userId: number, id: number) => {
  let user = await getRepository(User).findOne(userId);
  let notification = await getRepository(NotificationApartment).findOne({
    relations: ["userSeen"],
    where: { id: id },
  });

  if (!notification || !user) return HandelStatus(404);

  try {
    if (!notification.userSeen.find((o) => o.id == userId)) {
      notification.userSeen.push(user);
      await getRepository(NotificationApartment).save(notification);
      return HandelStatus(200);
    } else return HandelStatus(404);
  } catch (e) {
    console.log(e);
    return HandelStatus(500);
  }
};
const getAll = async (userId: number, take, skip) => {
  let takeOffset = parseInt(take);
  let skipOffset = parseInt(skip);

  let notification = await getRepository(NotificationApartment)
    .createQueryBuilder("notification")
    .innerJoin(
      "notification_apartment_user_subscribe_user",
      "userSubscribe",
      "userSubscribe.notificationApartmentId =notification.id && userSubscribe.userId=:userId",
      { userId: userId }
    )
    .leftJoin(
      "notification_apartment_user_seen_user",
      "userSeen",
      "userSeen.notificationApartmentId =notification.id && userSeen.userId =:userId",
      { userId: userId }
    )
    .leftJoinAndSelect("notification.userCreate", "userCreate")
    .leftJoinAndSelect("notification.apartment", "apartment")
    .leftJoinAndSelect("userCreate.avatar", "user_create_avatar")
    .addSelect("IF(userSeen.userId IS NOT NULL, 1, 0)", "isSeen")
    .addSelect("notification.id")
    .limit(takeOffset || 5)
    .offset(skip || 0)
    .orderBy("notification.creat_at", "DESC")
    .getRawMany();

  try {
    let result = plainToClass(NotificationGetList, notification, {
      excludeExtraneousValues: true,
    });

    return HandelStatus(200, null, {
      notifications: result,
    });
  } catch (e) {
    return HandelStatus(500, e);
  }
};
const getNews = async (userId: number) => {
  let SubCount = await getRepository(NotificationApartment)
    .createQueryBuilder("notification")
    .innerJoin(
      "notification_apartment_user_subscribe_user",
      "userSubscribe",
      "userSubscribe.notificationApartmentId =notification.id && userSubscribe.userId=:userId",
      { userId: userId }
    )
    .getCount();

  let SeenCount = await getRepository(NotificationApartment)
    .createQueryBuilder("notification")
    .innerJoin(
      "notification_apartment_user_subscribe_user",
      "userSubscribe",
      "userSubscribe.notificationApartmentId =notification.id && userSubscribe.userId=:userId",
      { userId: userId }
    )
    .innerJoin(
      "notification_apartment_user_seen_user",
      "userSeen",
      "userSeen.notificationApartmentId =notification.id && userSeen.userId =:userId",
      { userId: userId }
    )
    .getCount();

  return HandelStatus(200, null, {
    count: SubCount - SeenCount,
  });
};
export const NotificationApartmentService = { create, seen, getAll, getNews };
