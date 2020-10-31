import {
  addDistrictBySheet,
  addProvinceBySheet,
  addStreetBySheet,
  addWardBySheet,
} from "../../libs/init-data/addAdress";

const initProvinceBySheet = async (req, res) => {
  let id = req.body.id;
  let result = await addProvinceBySheet(id);
  return res.send(result);
};
const initDistrictBySheet = async (req, res) => {
  let id = req.body.id;
  let result = await addDistrictBySheet(id);
  return res.send(result);
};
const initWardBySheet = async (req, res) => {
  let id = req.body.id;

  let result = await addWardBySheet(id);
  return res.send(result);
};
const initStreetBySheet = async (req, res) => {
  let id = req.body.id;
  let result = await addStreetBySheet(id);
  return res.send(result);
};
export const InitAddressController = {
  initProvinceBySheet,
  initDistrictBySheet,
  initWardBySheet,
  initStreetBySheet,
};
