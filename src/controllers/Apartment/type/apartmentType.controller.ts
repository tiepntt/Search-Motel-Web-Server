import { ApartmentTypeSerive } from "../../../models/Apartment/type/apartmentype.model";

const getAll = async (req, res) => {
  let result = await ApartmentTypeSerive.getAll();
  return res.send(result);
};
export const ApartmentTypeController = { getAll };
