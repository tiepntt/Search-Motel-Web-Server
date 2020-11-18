import { deserialize, deserializeArray, plainToClass } from "class-transformer";
import { ETIMEDOUT } from "constants";
import { accessSync } from "fs";

import { Equal, getRepository, In, IsNull, Not } from "typeorm";
import { HandelStatus } from "../../config/HandelStatus";
import {
  AccountDto,
  UserAssignDto,
  UserDetailDto,
  UserGetDto,
  UserInputDto,
  UserListDto,
  UserLogin,
  UserTitleDto,
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
const getEmployments = async (userId) => {
  if (!userId) return HandelStatus(404);
  let userRepo = getRepository(User);
  let user = await userRepo.findOne(userId);
  let employments = await userRepo.find({
    relations: ["userManager", "role", "avatar"],
    where: {
      userManager: user,
    },
  });
  try {
    let result = deserializeArray(UserGetDto, JSON.stringify(employments), {
      excludeExtraneousValues: true,
    });
    return HandelStatus(200, null, result);
  } catch (e) {
    return HandelStatus(500, e.name);
  }
};
const getAllNewOwner = async () => {
  let role = await getRepository(Role).findOne({ code: "O" });
  let users = await getRepository(User).find({
    relations: ["role"],
    where: [
      {
        isApprove: false,
        role: role,
      },
      {
        role: role,
        userManager: IsNull(),
      },
    ],
  });
  try {
    let result = deserialize(UserTitleDto, JSON.stringify(users), {
      excludeExtraneousValues: true,
    });
    return HandelStatus(200, null, result);
  } catch (e) {
    return HandelStatus(500, e);
  }
};
const assignUserToAdmin = async (input: UserAssignDto) => {
  console.log(input);

  if (!input || !input.userId || !input.userAdminId) return HandelStatus(400);
  let userRepo = getRepository(User);
  let userAdmin = await userRepo
    .createQueryBuilder("user")
    .leftJoin("user.role", "role")
    .where("user.id=:id", { id: input.userAdminId })
    .andWhere("role.code=:code", { code: "A" })
    .getOne();
  if (!userAdmin) return HandelStatus(404, "user Admin Not found");
  let user = await userRepo.findOne({
    where: [
      {
        id: input.userId,
        isApprove: false,
        userManager: Not(IsNull()),
      },
      { id: input.userId, userManager: IsNull() },
    ],
  });
  if (!user) return HandelStatus(404, "user Not Found");
  user.isApprove = true;
  user.userManager = userAdmin;
  try {
    await userRepo.update(user.id, user);
    return HandelStatus(200);
  } catch (e) {
    return HandelStatus(500, e);
  }
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
    !userConfig.name ||
    !userConfig.email ||
    !userConfig.roleCode ||
    !userConfig.personNo
  )
    return HandelStatus(400);
  if (!checkEmail(userConfig.email))
    return HandelStatus(400, "Email k đúng định dạng");
  let userRepo = getRepository(User);
  let roleRepo = getRepository(Role);
  let avatarRepo = getRepository(AvatarUser);
  let user = plainToClass(User, userConfig);
  user.userManager = await userRepo.findOne(userConfig.managerId || -1);
  let userGet = await userRepo.findOne({ email: userConfig.email });
  let role = await roleRepo.findOne({ code: userConfig.roleCode });
  if (!role) return HandelStatus(404, "Role Not Found");
  if (userGet) return HandelStatus(302);
  user.role = role;
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
const remove = async (id: number) => {
  let userRepo = getRepository(User);
  let role = await getRepository(Role).findOne({ code: "MNG" });
  if (!role) return HandelStatus(404, "role Not Found");
  let user = await userRepo.findOne({ where: { id: id }, relations: ["role"] });
  if (!user) return HandelStatus(404);
  if (user.role.id === role.id)
    return HandelStatus(400, "Không thể xóa tài khoản manager");
  try {
    await userRepo.softDelete(user.id);
    return HandelStatus(200);
  } catch (e) {
    return HandelStatus(500);
  }
};
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
const getUsersByEmployment = async (userId: number) => {
  if (!userId) return HandelStatus(400);
  let user = await getRepository(User).find({
    relations: ["userChild"],
    where: {
      id: userId,
    },
  });
  if (!user) return HandelStatus(404);
  try {
    let resull = deserialize(UserListDto, JSON.stringify(user), {
      excludeExtraneousValues: true,
    });
    return HandelStatus(200, null, resull);
  } catch (e) {
    return HandelStatus(500, e);
  }
};

export const UserService = {
  getAll,
  create,
  getById,
  update,
  remove,
  changeAvatar,
  getByAccount,
  getEmployments,
  getAllNewOwner,
  assignUserToAdmin,
  getUsersByEmployment,
};
