import { DistrictService } from "../../models/Address/district.model";

const getAllByProvinceId = async (req, res) => {
  let provinceId = req.params.provinceId;
  let result = await DistrictService.getAllByProvinceId(provinceId);
  return res.send(result);
};
const create = async (req, res) => {
  let input = req.body.district;
  let result = await DistrictService.create(input);
  return res.send(result);
};
const update = async (req, res) => {
  let input = req.body.district;
  let result = await DistrictService.update(input);
  return res.send(result);
};
const getById = async (req, res) => {
  let districtId = req.params.districtId;
  let result = await DistrictService.getById(districtId);
  return res.send(result);
};
const remove = async (req, res) => {
  let districtId = req.body.districtId;
  let result = await DistrictService.remove(districtId);
  return res.send(result);
};
export const DistrictController = {
  getAllByProvinceId,
  create,
  update,
  getById,
  remove,
};
