import { plainToClass } from "class-transformer";
import { resolveTxt } from "dns";
import { StreetInputDto } from "../../dto/Adress/street.dto";
import { StreetService } from "../../models/Address/street.model";

const create = async (req, res) => {
  let input = req.body.street;
  let result = await StreetService.create(input);
  return res.send(result);
};
const getAllByDistrictId = async (req, res) => {
  let id = req.params.districtId;
  let result = await StreetService.getAllByDistrictId(id);
  return res.send(result);
};
const getById = async (req, res) => {
  let id = req.params.id;
  let result = await StreetService.getById(id);
  return res.send(result);
};
const update = async (req, res) => {
  let street = req.body.street;
  street = plainToClass(StreetInputDto, street);
  let result = await StreetService.update(street);
  return res.send(result);
};
const remove = async (req, res) => {
  let streetId = req.body.streetId;
  let result = await StreetService.remove(streetId);
  return res.send(result);
};
export const StreetController = {
  create,
  getAllByDistrictId,
  getById,
  update,
  remove,
};
