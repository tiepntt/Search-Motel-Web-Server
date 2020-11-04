import { json } from "body-parser";
import { deserialize, deserializeArray, plainToClass } from "class-transformer";
import { getRepository } from "typeorm";
import { runInThisContext } from "vm";
import { HandelStatus } from "../../config/HandelStatus";
import {
  AccountDto,
  UserDetailDto,
  UserDto,
  UserGetDto,
  UserInputDto,
  UserLogin,
  UserUpdateDto,
} from "../../dto/User/user.dto";
import { AvatarUser } from "../../entity/image/avatarUser";
import { Role } from "../../entity/user/Role";
import { User } from "../../entity/user/User";
import { mapObject } from "../../utils/map";
import { checkEmail } from "../../utils/regex";

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
  if (
    !userConfig ||
    !userConfig.roleId ||
    !userConfig.name ||
    !userConfig.email
  )
    return HandelStatus(400);
  if (!checkEmail(userConfig.email))
    return HandelStatus(400, "Email k đúng định dạng");
  let userRepo = getRepository(User);
  let roleRepo = getRepository(Role);
  let avatarRepo = getRepository(AvatarUser);
  let user = plainToClass(User, userConfig);

  let userGet = await userRepo.findOne({ email: userConfig.email });
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
const update = async (input: UserUpdateDto) => {
  if (!input || !input.id) return HandelStatus(400);
  let userRepo = getRepository(User);
  let user = await userRepo.findOne(input.id);
  if (!user) return HandelStatus(404);
  input = plainToClass(UserUpdateDto, input, { excludeExtraneousValues: true });
  let userUpdate = mapObject(user, input);
  console.log(userUpdate);

  try {
    await userRepo.update(input.id, userUpdate);
    return HandelStatus(200);
  } catch (e) {
    return HandelStatus(500, e);
  }
};
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
const getByAccount = async (account: UserLogin) => {
  if (!account || !account.email || !account.password) return HandelStatus(400);
  let user = await getRepository(User).findOne({
    relations: ["role", "avatar"],
    where: { email: account.email, password: account.password },
  });
  if (!user) return HandelStatus(401, "Email hoặc mật khẩu không đúng");
  let result = deserialize(AccountDto, JSON.stringify(user), {
    excludeExtraneousValues: true,
  });
  return HandelStatus(200, null, result);
};

export const UserService = {
  getAll,
  create,
  getById,
  update,
  remove,
  changeAvatar,
  getByAccount,
};
