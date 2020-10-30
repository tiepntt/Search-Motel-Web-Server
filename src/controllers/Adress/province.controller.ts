import { ProviceService } from "../../models/Adress/province.model";

const getAll = async (req, res) => {
  let result = await ProviceService.getAll();
  return res.send(result);
};
const create = async (req, res) => {
  let input = req.body.province;
  let result = await ProviceService.create(input);
  return res.send(result);
};
const getById = async (req, res) => {
  let input = req.params.id;
  let result = await ProviceService.getById(input);
  return res.send(result);
};
const update = async (req, res) => {
  let input = req.body.province;
  let result = await ProviceService.update(input);
  return res.send(result);
};
const remove = async (req, res) => {
  let input = req.parmas.id;
  let result = await ProviceService.remove(input);
  return res.send(result);
};
export const ProvinceController = { create, getAll, getById, update, remove };
