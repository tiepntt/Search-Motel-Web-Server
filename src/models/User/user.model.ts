import { deserialize, deserializeArray, plainToClass } from "class-transformer";
import { ETIMEDOUT } from "constants";
import { accessSync } from "fs";

import {
  Equal,
  getRepository,
  In,
  IsNull,
  LessThan,
  Like,
  MoreThan,
  Not,
} from "typeorm";
import { HandelStatus } from "../../config/HandelStatus";
import {
  AccountDto,
  ChangePasswordDto,
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
import { SendMail } from "../../services/email/config";
import { changePasswordForm } from "../../services/email/form";
import { addDate } from "../../utils/dateTime";
import { genPassword } from "../../utils/genPassword";
import { mapObject } from "../../utils/map";
import { checkEmail } from "../../utils/regex";
import { NotificationApartmentService } from "../Notification/notification.apartment.model";

const getAll = async (take: number, skip: number, key?: string) => {
  let userRepo = getRepository(User);
  let role = await getRepository(Role).findOne({ code: "R" });
  if (!role) return HandelStatus(400);
  let user = await userRepo.findAndCount({
    relations: ["avatar", "role", "contactUser"],
    where: {
      role: role,
      name: Like(`%${key}%`),
    },
    take: take || 5,
    skip: skip || 0,
  });
  let userRes = deserializeArray(UserGetDto, JSON.stringify(user[0]), {
    excludeExtraneousValues: true,
  });

  return HandelStatus(200, null, { data: userRes, count: user[1] });
};

const getEmployments = async (
  userId: number,
  take?: number,
  skip?: number,
  key?: string
) => {
  if (!userId) return HandelStatus(404);
  let userRepo = getRepository(User);
  let user = await userRepo.findOne(userId);
  let roleAdmin = await getRepository(Role).findOne({ code: "A" });
  if (!roleAdmin) return HandelStatus(500);

  let employments = await userRepo.findAndCount({
    relations: ["userManager", "role", "avatar"],

    where: {
      userManager: user,
      role: roleAdmin,
      name: Like(`%${key || ""}%`),
    },
    take: take || 5,
    skip: skip || 0,
  });
  try {
    let result = deserializeArray(UserGetDto, JSON.stringify(employments[0]), {
      excludeExtraneousValues: true,
    });
    return HandelStatus(200, null, { result, count: employments[1] });
  } catch (e) {
    return HandelStatus(500, e.name);
  }
};

const getAllNewOwner = async (input: {
  isApprove: number;
  take?: number;
  skip: number;
  key?: string;
}) => {
  let role = await getRepository(Role).findOne({ code: "O" });
  if (!role) return HandelStatus(400);

  let condition = {
    relations: ["role", "userManager"],
    where: [
      {
        isApprove: input.isApprove === -1 ? 1 : input.isApprove,
        role: role,
        name: Like(`%${input.key || ""}%`),
      },
      {
        isApprove: input.isApprove === -1 ? 0 : input.isApprove,
        role: role,
        email: Like(`%${input.key || ""}%`),
      },
    ],
    take: input.take || 10,
    skip: input.skip || 0,
  };
  let users = await getRepository(User).findAndCount(condition);
  try {
    let result = deserialize(UserGetDto, JSON.stringify(users), {
      excludeExtraneousValues: true,
    });
    return HandelStatus(200, null, { data: result[0], count: result[1] });
  } catch (e) {
    return HandelStatus(500, e);
  }
};
const getRenter = async (input: {}) => {};
const assignUserToAdmin = async (input: UserAssignDto) => {


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
    await NotificationApartmentService.create({
      context:
        "Tài khoản của bạn đã được phê duyệt. Giờ đây, bạn có thể đăng tin các bài cho thuê phòng trọ.",
      apartment: null,
      userCreate: userAdmin,
      userSubscribe: [user],
    });
    return HandelStatus(200);
  } catch (e) {
    return HandelStatus(500, e);
  }
};
const getById = async (id) => {
  let userRepo = getRepository(User);
  let user = await userRepo.findOne({
    relations: ["role", "contactUser", "avatar"],
    where: {
      id: id,
    },
  });


  if (!user) return HandelStatus(404);
  let userRes = plainToClass(UserDetailDto, user, {
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
  let role = await roleRepo.findOne({
    code: userConfig.roleCode,
  });
  if (!role) return HandelStatus(404, "Role Not Found");
  if (userGet) {
    if (userGet.email === userConfig.email)
      return HandelStatus(302, "Email đã được sử dụng");
    if (userGet.personNo === userConfig.personNo)
      return HandelStatus(302, "Số CMND đã được sử dụng");
    return HandelStatus(302);
  }
  user.role = role;
  let avatar = new AvatarUser();
  user.avatar = avatar;
  try {
    await avatarRepo.save(avatar);
    await userRepo.save(user);
    return HandelStatus(200, null, { id: user.id });
  } catch (e) {
    return HandelStatus(500, e.name);
  }
};
const update = async (input: UserUpdateDto) => {
  if (!input || !input.id) return HandelStatus(400);
  let userRepo = getRepository(User);
  let user = await userRepo.findOne(input.id);
  let userGet = await userRepo.findOne({ email: input.email });

  if (!user) return HandelStatus(404);
  if (user.id != userGet.id) return HandelStatus(404, "Email đã tồn tại");
  input = plainToClass(UserUpdateDto, input, { excludeExtraneousValues: true });
  let userUpdate = mapObject(user, input);

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
    return HandelStatus(200, null, { avatar });
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


  if (!user) return HandelStatus(404, "Email hoặc mật khẩu không đúng");
  let result = deserialize(AccountDto, JSON.stringify(user), {
    excludeExtraneousValues: true,
  });
  return HandelStatus(200, null, result);
};
const getAccount = async (userId: number) => {
  if (!userId) return HandelStatus(400);
  let user = await getRepository(User).findOne({
    relations: ["role", "avatar"],
    where: { id: userId },
  });

  if (!user) return HandelStatus(404);
  let result = deserialize(AccountDto, JSON.stringify(user), {
    excludeExtraneousValues: true,
  });
  return HandelStatus(200, null, result);
};
const getUsersByEmployment = async (
  userId?: number,
  take?: number,
  skip?: number,
  key?: string
) => {


  if (!userId) return HandelStatus(400);
  let userManager = await getRepository(User).findOne({
    where: {
      id: userId,
    },
  });
  if (!userManager) return HandelStatus(404);
  let user = await getRepository(User).findAndCount({
    where: { userManager: userManager, name: Like(`%${key}%`) },
    take: take || 5,
    skip: skip || 0,
  });
  try {
    let result = deserialize(UserGetDto, JSON.stringify(user[0]), {
      excludeExtraneousValues: true,
    });
    return HandelStatus(200, null, { data: result, count: user[1] });
  } catch (e) {
    return HandelStatus(500, e);
  }
};
const changePassword = async (input: ChangePasswordDto) => {


  if (!input || !input.id || !input.oldPassword || !input.newPassword)
    return HandelStatus(400);
  let userRepo = getRepository(User);
  let user = await userRepo.findOne({
    id: input.id,
    password: input.oldPassword,
  });



  if (!user) return HandelStatus(404, "Mật khẩu không đúng");
  user.password = input.newPassword;
  try {
    await userRepo.save(user);
    return HandelStatus(200);
  } catch (e) {
    return HandelStatus(500, e.name);
  }
};
const resetPassword = async (email) => {
  let userRepo = getRepository(User);
  if (!email) return HandelStatus(400);
  let user = await userRepo.findOne({ email: email });
  if (!user) return HandelStatus(404, "Khong ton tai email");
  user.password = genPassword();

  try {
    let textEmail = changePasswordForm({
      to: user.email,
      password: user.password,
      name: user.name,
    });
    let check = await SendMail(textEmail);
    if (check.status == 200) {
      await userRepo.save(user);
      return HandelStatus(
        200,
        `Mật khẩu mới đã được gửi tới email ${user.email}.`
      );
    } else return HandelStatus(500);
  } catch (e) {
    return HandelStatus(500);
  }
};
const getNews = async () => {
  let date = addDate(new Date(), -30);
  let news = await getRepository(User).count({
    where: {
      create_at: MoreThan(date),
    },
  });
  return news;
};
export const UserService = {
  getNews,
  resetPassword,
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
  getAccount,
  changePassword,
};
