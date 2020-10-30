import { WardService } from "../../models/Adress/ward.model";

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
export const WardController = { create, getAllByDistrictId };
