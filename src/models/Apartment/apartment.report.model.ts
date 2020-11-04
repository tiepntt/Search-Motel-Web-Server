import { deserialize, plainToClass } from "class-transformer";
import { getRepository } from "typeorm";
import { HandelStatus } from "../../config/HandelStatus";
import {
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
const getAllByUserAdmin = (input: ApartmentReportInputDto) => {};
const approve = (id: number) => {};
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
const remove = (id: number) => {};
export const ApartmentReportService = {
  create,
  getAllByUserAdmin,
  approve,
  getById,
  remove,
};
