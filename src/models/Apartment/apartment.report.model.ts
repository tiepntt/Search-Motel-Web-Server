import { deserialize, plainToClass } from "class-transformer";
import { getRepository } from "typeorm";
import { HandelStatus } from "../../config/HandelStatus";
import {
  ApartmentReportDto,
  ApartmentReportGetDto,
  ApartmentReportInputDto,
} from "../../dto/Apartment/apartmentReport.dto";
import { Apartment } from "../../entity/apartment/apartment";
import { ApartmentReport } from "../../entity/apartment/apartmentReport";
import { User } from "../../entity/user/User";

const create = async (input: ApartmentReportInputDto) => {
  if (!input || !input.apartmentId || !input.userId) return HandelStatus(400);
  let apartmentReportRepo = getRepository(ApartmentReport);
  let user = await getRepository(User).findOne(input.userId);
  let apartment = await getRepository(Apartment).findOne(input.apartmentId);
  if (!user || !apartment) return HandelStatus(404);
  let report = plainToClass(ApartmentReport, input);
  report.user = user;
  report.apartment = apartment;
  try {
    await apartmentReportRepo.save(report);
    return HandelStatus(200);
  } catch (e) {
    return HandelStatus(500, e.code);
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
const remove = async (id: number, userId: number) => {
  let apartment = await getRepository(Apartment).findOne(id || -1);
  let user = await getRepository(User).findOne(userId || -1);
  if (!user) return HandelStatus(401);
  if (!apartment) return HandelStatus(404);
  apartment.userDeleted = user;
  try {
    await getRepository(Apartment).softDelete(apartment);
    return HandelStatus(200);
  } catch (e) {
    return HandelStatus(500, e);
  }
};
export const ApartmentReportService = {
  create,
  getAllByUserAdmin,
  getById,
  remove,
};
