import { plainToClass } from "class-transformer";
import { ApartmentReportInputDto } from "../../dto/Apartment/apartmentReport.dto";
import { ApartmentReportService } from "../../models/Apartment/apartment.report.model";

const create = async (req, res) => {
  let report = req.body.report;
  report.userId = res.locals.userId;
  report = plainToClass(ApartmentReportInputDto, report);
  let result = await ApartmentReportService.create(report);
  return res.send(result);
};
const getById = async (req, res) => {
  let id = req.params.id;
  let result = await ApartmentReportService.getById(id);
  return res.send(result);
};
const remove = async (req, res) => {};
export const ApartmentReportController = { create, getById };
