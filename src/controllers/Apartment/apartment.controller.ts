import { plainToClass } from "class-transformer";
import { ApartmentInputDto } from "../../dto/Apartment/apartment.dto";
import { ConditionApartmentSearch } from "../../dto/Search/condition.dto";
import { ApartmentService } from "../../models/Apartment/apartment.model";
import { ApartmentHobbyService } from "../../models/User/hobby.model";

const create = async (req, res) => {
  let body = req.body;
  let input = plainToClass(ApartmentInputDto, body, {
    excludeExtraneousValues: true,
  });
  input.userId = res.locals.userId || undefined;
  let result = await ApartmentService.create(input);
  return res.send(result);
};
const getAll = async (req, res) => {
  let condition = req.query;
  if (!condition) condition = new ConditionApartmentSearch();

  let input = plainToClass(ConditionApartmentSearch, condition);
  let result = await ApartmentService.getAll(input);
  return res.send(result);
};
const getAllByUserId = async (req, res) => {
  let userId = req.params.userId;
  let result = await ApartmentService.getAllByUserId(userId);
  return res.send(result);
};
const getAllApartmentByUserId = async (req, res) => {
  let { take, skip, isApprove, key } = req.query;
  let userId = res.locals.userId;
  let result = await ApartmentService.getAllApartmentByUser(
    userId,
    take,
    skip,
    isApprove,
    key
  );
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
const changeStatus = async (req, res) => {
  let userId = res.locals.userId;
  let { apartmentId } = req.body;
  let result = await ApartmentService.changeStatus(userId, apartmentId);
  return res.send(result);
};
const extendApartment = async (req, res) => {
  let userId = res.locals.userId;
  let { apartmentId, postPriceId } = req.body;
  let result = await ApartmentService.extendApartment(
    userId,
    apartmentId,
    postPriceId
  );
  return res.send(result);
};
const saveToHobby = async (req, res) => {
  let userId = res.locals.userId;
  let { apartmentId } = req.body;
  let result = await ApartmentHobbyService.create({ userId, apartmentId });
  return res.send(result);
};
const removeToHobby = async (req, res) => {
  let userId = res.locals.userId;
  let apartmentId = req.params.apartmentId;
  let result = await ApartmentHobbyService.remove({ userId, apartmentId });
  return res.send(result);
};
const getHobby = async (req, res) => {
  let userId = res.locals.userId;
  let { take, skip, key } = req.query;
  let result = await ApartmentHobbyService.getByUserId(userId, take, skip, key);
  return res.send(result);
};
export const ApartmentController = {
  getHobby,
  create,
  getAll,
  getAllByUserId,
  remove,
  restore,
  getRemoved,
  getAllApartmentByUserId,
  changeStatus,
  removeToHobby,
  saveToHobby,
  extendApartment,
};
