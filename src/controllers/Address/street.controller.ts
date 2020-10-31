import { resolveTxt } from "dns";
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

export const StreetController = { create, getAllByDistrictId, getById };
