import { ToiletTypeService } from "../../../models/Apartment/type/toiletType.model";

const getAll = async (req, res) => {
  let result = await ToiletTypeService.getAll();
  return res.send(result);
};
export const ToiletTypeController = { getAll };
