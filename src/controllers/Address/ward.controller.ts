import { plainToClass } from "class-transformer";
import { getRepository } from "typeorm";
import { HandelStatus } from "../../config/HandelStatus";
import { WardInputDto } from "../../dto/Adress/ward.dto";
import { WardService } from "../../models/Address/ward.model";

const getAllByDistrictId = async (req, res) => {
  let districtId = req.params.districtId;
  let result = await WardService.getAllByDistrictId(districtId);
  return res.send(result);
};
const create = async (req, res) => {
  let input = req.body.ward; 
  let result = await WardService.create(input);
  return res.send(result);
};
const getById = async (req, res) => {
  let id = req.params.wardId;
  let result = await WardService.getById(id);
  return res.send(result);
};
const udpate = async (req, res) => {
  let ward = req.body.ward;
  ward = plainToClass(WardInputDto, ward);
  let result = await WardService.update(ward);
  return res.send(result);
};
const remove = async (req, res) => {
  let id = req.body.wardId;
  let result = await WardService.remove(id);
  return res.send(result);
};
export const WardController = {
  create,
  getAllByDistrictId,
  getById,
  udpate,
  remove,
};
