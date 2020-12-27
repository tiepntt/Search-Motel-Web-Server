import { deserialize, plainToClass } from "class-transformer";
import { getRepository, Like } from "typeorm";
import { HandelStatus } from "../../config/HandelStatus";
import { ApartmentReviewGetDto } from "../../dto/Apartment/apartmentReivew.dto";
import {
  ApartmentReportDto,
  ApartmentReportGetDto,
  ApartmentReportInputDto,
} from "../../dto/Apartment/apartmentReport.dto";
import { Apartment } from "../../entity/apartment/apartment";
import { ApartmentReport } from "../../entity/apartment/apartmentReport";
import { Role } from "../../entity/user/Role";
import { User } from "../../entity/user/User";
import { NotificationApartmentService } from "../Notification/notification.apartment.model";

const create = async (input: ApartmentReportInputDto) => {
  if (!input || !input.apartmentId || !input.userId) return HandelStatus(400);
  let apartmentReportRepo = getRepository(ApartmentReport);
  let user = await getRepository(User).findOne(input.userId);
  let apartment = await getRepository(Apartment).findOne({
    relations: ["user"],
    where: { id: input.apartmentId },
  });
  let apartmentGet = await apartmentReportRepo.findOne({
    user: user,
    apartment: apartment,
  });

  if (apartmentGet) return HandelStatus(302, "Đã báo cáo");
  if (!user || !apartment) return HandelStatus(404);
  let report = plainToClass(ApartmentReport, input);
  report.user = user;
  report.apartment = apartment;

  try {
    await apartmentReportRepo.save(report);
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
      context: user.name + " đã báo cáo bài đăng của " + apartment.user.name,
      apartment: apartment,
      userCreate: user,
      userSubscribe: userSubscribe,
    });
    return HandelStatus(200);
  } catch (e) {
    console.log(e);

    return HandelStatus(500);
  }
};
const getAllByUserAdmin = async (userId: number) => {
  let apartments = await getRepository(Apartment)
    .createQueryBuilder("apartment")
    .innerJoin("apartment.reports", "reports")
    .innerJoin("apartment.userApprove", "userApprove", "userApprove.id =:id", {
      id: userId || -1,
    })
    .getMany();
  try {
    let apartmentList = plainToClass(ApartmentReportDto, apartments, {
      excludeExtraneousValues: true,
    });
    for (let apartment of apartmentList) {
      apartment.reportCount = await getRepository(ApartmentReport).count({
        apartment: apartment,
      });
    }
    return HandelStatus(200, null, apartmentList);
  } catch (e) {
    return HandelStatus(500, e.name);
  }
};
const getById = async (id: number) => {
  if (!id) return HandelStatus(400);
  let report = await getRepository(ApartmentReport).findOne({
    relations: ["user", "apartment"],
    where: {
      id: id,
    },
  });
  if (!report) return HandelStatus(404);
  let result = deserialize(ApartmentReportGetDto, JSON.stringify(report), {
    excludeExtraneousValues: true,
  });
  return HandelStatus(200, null, result);
};
const remove = async (id: number) => {
  let reportRepo = getRepository(ApartmentReport);
  let report = await reportRepo.findOne(id);
  if (!report) return HandelStatus(404, "Đã  xóa");
  try {
    await reportRepo.remove(report);
    return HandelStatus(200, "Đã xóa");
  } catch (e) {
    return HandelStatus(500);
  }
};

const approveReport = async (id: number) => {
  let report = await getRepository(ApartmentReport).findOne(id);
  if (!report) return HandelStatus(404);
  report.isApprove = true;
  try {
    await getRepository(ApartmentReport).save(report);
    return HandelStatus(200);
  } catch (e) {
    return HandelStatus(500, e);
  }
};
const getAllApproveYet = async (key?: string, take?: number, skip?: number) => {
  let apartmentReviewRepo = getRepository(ApartmentReport);
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
export const ApartmentReportService = {
  create,
  getAllByUserAdmin,
  getById,
  remove,
  approveReport,
  getAllApproveYet,
};
