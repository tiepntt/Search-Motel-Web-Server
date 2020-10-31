import { ProvinceService } from "../../models/Address/province.model";

const getAll = async (req, res) => {
  let result = await ProvinceService.getAll();
  return res.send(result);
};
const create = async (req, res) => {
  let input = req.body.province;
  let result = await ProvinceService.create(input);
  return res.send(result);
};
const getById = async (req, res) => {
  let input = req.params.id;
  let result = await ProvinceService.getById(input);
  return res.send(result);
};
const update = async (req, res) => {
  let input = req.body.province;
  let result = await ProvinceService.update(input);
  return res.send(result);
};
const remove = async (req, res) => {
  let input = req.parmas.id;
  let result = await ProvinceService.remove(input);
  return res.send(result);
};
export const ProvinceController = { create, getAll, getById, update, remove };
