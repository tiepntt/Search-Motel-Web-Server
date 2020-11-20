import { KitchenTypeService } from "../../../models/Apartment/type/kitchenType.model";

const getAll = async (req, res) => {
  let result = await KitchenTypeService.getAll();
  return res.send(result);
};
export const KitchenTypeController = { getAll };
