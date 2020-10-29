import { RoleService } from "../../models/User/role.model";

const getAll = async (req, res) => {
  let result = await RoleService.getAll();
  res.send(result);
};
export const RoleController = { getAll };
