import { plainToClass } from "class-transformer";
import { HandelStatus } from "../../config/HandelStatus";
import { ApartmentInputDto } from "../../dto/Apartment/apartment.dto";
import { ConditionApartmentSearch } from "../../dto/Search/condition.dto";
import { ApartmentService } from "../../models/Apartment/apartment.model";
import { mapObject } from "../../utils/map";

const create = async (req, res) => {
  let body = req.body;
  console.log(req.body);
  let input = plainToClass(ApartmentInputDto, body);
  input.avatar = req.file ? req.file.path : undefined;
  let result = await ApartmentService.create(input);
  return res.send(result);
};
const getAll = async (req, res) => {
  let condition = req.body.condition;
  if (!condition) return res.send(HandelStatus(400));
  let input = plainToClass(ConditionApartmentSearch, condition);
  let result = await ApartmentService.getAll(input);
  return res.send(result);
};
export const ApartmentController = { create, getAll };
