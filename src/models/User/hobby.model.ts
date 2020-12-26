import { plainToClass } from "class-transformer";
import { getRepository, In, Like } from "typeorm";
import { HandelStatus } from "../../config/HandelStatus";
import { ApartmentDto } from "../../dto/Apartment/apartment.dto";
import { Apartment } from "../../entity/apartment/apartment";
import { Hobby } from "../../entity/user/Hoby";
import { User } from "../../entity/user/User";
import { ApartmentReviewHelper } from "../../helper/apartment.review.helper";
import { ApartmentReportHelper } from "../../helper/apartmentReport.helper";

export const ApartmentHobbyService = {
  create: async (input: { userId: number; apartmentId: number }) => {
    let user = await getRepository(User).findOne(input.userId);
    let apartment = await getRepository(Apartment).findOne(input.apartmentId);
    if (!user || !apartment) return HandelStatus(400);
    let hobbyGet = await getRepository(Hobby).findOne({
      where: {
        user: user,
        apartment: apartment,
      },
    });
    let hobby = new Hobby();
    hobby.user = user;
    hobby.apartment = apartment;
    if (hobbyGet) return HandelStatus(302, "Đã lưu");
    try {
      await getRepository(Hobby).save(hobby);
      return HandelStatus(200);
    } catch (e) {
      return HandelStatus(500);
    }
  },
  remove: async (input: { userId: number; apartmentId: number }) => {
    let user = await getRepository(User).findOne(input.userId);
    let apartment = await getRepository(Apartment).findOne(input.apartmentId);
    if (!user || !apartment) return HandelStatus(400);
    let hobbyGet = await getRepository(Hobby).findOne({
      where: {
        user: user,
        apartment: apartment,
      },
    });

    if (!hobbyGet) return HandelStatus(404);
    try {
      await getRepository(Hobby).delete(hobbyGet);
      return HandelStatus(200);
    } catch (e) {
      return HandelStatus(500);
    }
  },
  getByUserId: async (
    userId: number,
    take: number,
    skip: number,
    key: number
  ) => {
    let user = await getRepository(User).findOne(userId);
    if (!user) return HandelStatus(400);
    try {
      let hobby = await getRepository(Hobby)
        .createQueryBuilder("hobby")
        .leftJoin("hobby.apartment", "apartment")
        .innerJoin("hobby.user", "user", "user.id =:userId", {
          userId: userId,
        })
        .where("apartment.hint like :key", { key: `%${key || ""}%` })
        .andWhere("apartment.isApprove = 1")
        .select("hobby.id")
        .addSelect("apartment.id")
        .addSelect("user.id")
        .take(take || 5)
        .skip(skip || 0)
        .getMany();
      // return HandelStatus(200, null, hobby);

      let apartmentIds = [];
      hobby.forEach((item) => {
        apartmentIds.push(item.apartment.id);
      });
      let apartments = await getRepository(Apartment).findAndCount({
        relations: [
          "street",
          "ward",
          "district",
          "province",
          "user",
          "type",
          "userApprove",
          "pricePost",
        ],
        where: {
          id: In(apartmentIds),
        },
      });
      let apartmentsGet = { ...apartments }[0];
      let dtos = plainToClass(ApartmentDto, apartmentsGet, {
        excludeExtraneousValues: true,
      });

      for (let i = 0; i < apartments[0].length; i++) {
        dtos[i].reportCount = await ApartmentReportHelper.getCountByApartment(
          apartments[0][i]
        );
        dtos[i].reviewCount = await ApartmentReviewHelper.getCountByApartment(
          apartments[0][i]
        );
      }
      return HandelStatus(200, null, { data: dtos, count: apartments[1] });
    } catch (e) {
      return HandelStatus(500, e);
    }
  },
};
