import { plainToClass } from "class-transformer";
import { ApartmentInputDto } from "../../dto/Apartment/apartment.dto";
import { ConditionApartmentSearch } from "../../dto/Search/condition.dto";
import { ApartmentService } from "../../models/Apartment/apartment.model";
import { getUrl } from "../../utils/regex";

const create = async (req, res) => {
  let body = req.body;
  console.log();

  let input = plainToClass(ApartmentInputDto, body);
  input.userId = res.locals.userId || undefined;

  input.avatar = req.file ? getUrl(req.file.path) : undefined;
  let result = await ApartmentService.create(input);
  return res.send(result);
};
const getAll = async (req, res) => {
  let condition = req.body.condition;
  if (!condition) condition = new ConditionApartmentSearch();
  console.log(condition);

  let input = plainToClass(ConditionApartmentSearch, condition);
  let result = await ApartmentService.getAll(input);
  return res.send(result);
};
const getAllByUserId = async (req, res) => {
  let userId = req.params.userId;
  let result = await ApartmentService.getAllByUserId(userId);
  return res.send(result);
};
const remove = async (req, res) => {
  let apartmentId = req.body.apartmentId;
  let userId = res.locals.userId;
  let result = await ApartmentService.remove(apartmentId, userId);
  return res.send(result);
};
const getRemoved = async (req, res) => {
  let result = await ApartmentService.getDeleted();
  return res.send(result);
};
const restore = async (req, res) => {
  let apartmentId = req.body.apartmentId;
  let result = await ApartmentService.restoreById(apartmentId);
  return res.send(result);
};
export const ApartmentController = {
  create,
  getAll,
  getAllByUserId,
  remove,
  restore,
  getRemoved,
};
