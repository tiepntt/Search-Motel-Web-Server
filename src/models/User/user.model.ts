import { deserializeArray, plainToClass } from "class-transformer";
import { getRepository } from "typeorm";
import { HandelStatus } from "../../config/HandelStatus";
import {
  UserDetailDto,
  UserDto,
  UserGetDto,
  UserInputDto,
} from "../../dto/User/user.dto";
import { AvatarUser } from "../../entity/image/avatarUser";
import { Role } from "../../entity/user/Role";
import { User } from "../../entity/user/User";

const getAll = async () => {
  let userRepo = getRepository(User);
  let user = await userRepo
    .createQueryBuilder("user")
    .leftJoinAndSelect("user.avatar", "avatar")
    .getMany();
  let userRes = deserializeArray(UserGetDto, JSON.stringify(user), {
    excludeExtraneousValues: true,
  });

  return HandelStatus(200, null, userRes);
};
const getById = async (id) => {
  let userRepo = getRepository(User);
  let user = await userRepo
    .createQueryBuilder("user")
    .leftJoinAndSelect("user.role", "role")
    .leftJoinAndSelect("user.contactUser", "contactUser")
    .leftJoinAndSelect("user.avatar", "avatar")
    .where("user.id = :id", { id: id })
    .getOne();
  if (!user) return HandelStatus(404);
  let userRes = deserializeArray(UserDetailDto, JSON.stringify(user), {
    excludeExtraneousValues: true,
  });

  return HandelStatus(200, null, userRes);
};
const create = async (userConfig: UserInputDto) => {
  if (!userConfig || !userConfig.roleId || !userConfig.username)
    return HandelStatus(400);
  let userRepo = getRepository(User);
  let roleRepo = getRepository(Role);
  let avatarRepo = getRepository(AvatarUser);
  let user = plainToClass(User, userConfig);

  let userGet = await userRepo.findOne({ username: userConfig.username });
  let role = await roleRepo.findOne(userConfig.roleId);
  if (!role) return HandelStatus(404, "Role Not Found");
  if (userGet) return HandelStatus(302);
  user.role = role;
  user.userManager = null;
  let avatar = new AvatarUser();
  user.avatar = avatar;

  try {
    await avatarRepo.save(avatar);
    await userRepo.save(user);
    return HandelStatus(200);
  } catch (e) {
    return HandelStatus(400, e);
  }
};
const update = async (userConfig: UserDto) => {};
const remove = async (id: number) => {};
const changeAvatar = async (avatarId: number, userId: number) => {
  if (!avatarId || !userId) return HandelStatus(400);
  let avatarUserRepo = getRepository(AvatarUser);
  let userRepo = getRepository(User);
  let user = await userRepo.findOne(userId);
  if (!user) return HandelStatus(404);
  let avatar = await avatarUserRepo.findOne(avatarId);
  user.avatar = avatar || user.avatar;
  try {
    await userRepo.update(userId, user);
    return HandelStatus(200);
  } catch (e) {
    return HandelStatus(500, e.name);
  }
};

export const UserService = {
  getAll,
  create,
  getById,
  update,
  remove,
  changeAvatar,
};
