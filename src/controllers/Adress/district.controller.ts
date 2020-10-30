import { DistrictService } from "../../models/Adress/district.model";

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
const udpate = async (req, res) => {
  let input = req.body.district;
  let result = await DistrictService.update(input);
  return res.send(result);
};
export const DistrictController = { getAllByProvinceId, create, udpate };
