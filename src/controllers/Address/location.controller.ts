import { LocationService } from "../../models/Address/location.model";

const getAllByProvinceId = async (req, res) => {
    let provinceId = req.params.provinceId;
    let result = await LocationService.getAllByProvinceId(provinceId);
    return res.send(result);
};
const getAllByDistrictId = async (req, res) => {
    let districtId = req.params.districtId;
    let result = await LocationService.getAllByDistrictId(districtId);
    return res.send(result);
}
const getById = async (req, res) => {
    let id = req.params.id;
    let result = await LocationService.getById(id);
    return res.send(result);
};
const create = async (req, res) => {
    let input = req.body.location;
    let result = await LocationService.create(input);
    return res.send(result);
};
const update = async (req, res) => {
  let input = req.params.location;
  let result = await LocationService.update(input);
  return res.send(result);
};
const remove = async (req, res) => {
    let id = req.params.id;
    let result = await LocationService.remove(id);
    return res.send(result);
};
export const LocationController = {
  getAllByProvinceId,
  getAllByDistrictId,
  getById,
  create,
  update,
  remove,
};
  