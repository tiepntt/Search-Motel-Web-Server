import { deserializeArray, plainToClassFromExist } from "class-transformer";
import { getRepository } from "typeorm";
import mapper, { DtoMapperUser, UserMapperDto } from "../../config/autoMap";
import { HandelStatus } from "../../config/HandelStatus";
import { UserDetailDto, UserDto, UserGetDto } from "../../dto/User/user.dto";
import { Role } from "../../entity/user/Role";
import { User } from "../../entity/user/User";

const getAll = async () => {
  let userRepo = getRepository(User);
  let user = await userRepo.find();

  let userRes = plainToClassFromExist(UserGetDto, user, {
    excludeExtraneousValues: false,
  });

  return HandelStatus(200, null, userRes);
};
const getById = async (id) => {
  let userRepo = getRepository(User);
  let user = await userRepo
    .createQueryBuilder("user")
    .leftJoin("user.role", "role")
    .select("user")
    .addSelect("role")
    .leftJoinAndSelect("user.contactUser", "contactUser")
    .where("user.id = :id", { id: id })
    .getOne();
  if (!user) return HandelStatus(404);
  let userRes = deserializeArray(UserDetailDto, JSON.stringify(user), {
    excludeExtraneousValues: true,
    excludePrefixes: ["_"],
  });

  return HandelStatus(200, null, userRes);
};
const create = async (userConfig: UserDto) => {
  let userRepo = getRepository(User);
  let roleRepo = getRepository(Role);
  let user = mapper.map(DtoMapperUser, userConfig);
  let userGet = await userRepo.findOne({ username: userConfig.username });
  let role = await roleRepo.findOne(userConfig.roleId);
  if (!role) return HandelStatus(404, "Role Not Found");
  if (userGet) return HandelStatus(302);
  user.role = role;
  user.userManager = null;

  try {
    await userRepo.save(user);
    return HandelStatus(200);
  } catch (e) {
    return HandelStatus(400, e.massage);
  }
};
export const UserService = { getAll, create, getById };
