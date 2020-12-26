import { plainToClass } from "class-transformer";
import { ApartmentReportInputDto } from "../../dto/Apartment/apartmentReport.dto";
import { ApartmentReportService } from "../../models/Apartment/apartment.report.model";

const create = async (req, res) => {
  let apartmentId = req.body.apartmentId;
  let userId = res.locals.userId;

  let reportInput = new ApartmentReportInputDto();
  reportInput.apartmentId = apartmentId;
  reportInput.userId = userId;
  let result = await ApartmentReportService.create(reportInput);
  return res.send(result);
};
const getById = async (req, res) => {
  let id = req.params.id;
  let result = await ApartmentReportService.getById(id);
  return res.send(result);
};
const remove = async (req, res) => {};
export const ApartmentReportController = { create, getById };
