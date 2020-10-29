import { deserialize, deserializeArray } from "class-transformer";
import { getRepository } from "typeorm";
import { HandelStatus } from "../../config/HandelStatus";
import { RoleDto } from "../../dto/User/role.dto";
import { Role } from "../../entity/user/Role";

const getAll = async () => {
  let roleRepo = getRepository(Role);
  let role = await roleRepo.find();
  let result = deserializeArray(RoleDto, JSON.stringify(role), {
    excludeExtraneousValues: true,
  });
  if (!role) {
    return HandelStatus(404);
  } else return HandelStatus(200, null, result);
};
const getById = async (id) => {
  let roleRepo = getRepository(Role);
  let role = await roleRepo.findOne({ id: id });
  let result = deserialize(RoleDto, JSON.stringify(role), {
    excludeExtraneousValues: true,
  });
  if (!role) {
    return HandelStatus(404);
  } else return HandelStatus(200, null, result);
};
export const RoleService = { getAll, getById };
