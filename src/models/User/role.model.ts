import { getRepository } from "typeorm";
import { HandelStatus } from "../../config/HandelStatus";
import { Role } from "../../entity/user/Role";

const getAll = async () => {};
const getById = async (id) => {
  let roleRepo = getRepository(Role);
  let role = await roleRepo.findOne({ id: id });

  if (!role) {
    return HandelStatus(404);
  } else return HandelStatus(200, null, role);
};
export const RoleService = { getAll, getById };
