import { plainToClass } from "class-transformer";
import { getRepository } from "typeorm";
import { HandelStatus } from "../../config/HandelStatus";
import { AvatarUserDto } from "../../dto/Image/avatarUser.dto";
import { AvatarUser } from "../../entity/image/avatarUser";
const getByUserId = async (userId: number) => {};
const create = async (input: AvatarUserDto) => {
  let avatarUserRepo = getRepository(AvatarUser);
  let avatar = plainToClass(AvatarUser, input);
  try {
    await avatarUserRepo.save(avatar);
    return HandelStatus(200, null, { id: avatar.id });
  } catch (e) {
    return HandelStatus(500, e.name);
  }
};
const update = async (input: AvatarUserDto) => {};
const getById = async (id: number) => {};
const remove = async (id: number) => {};
export const AvatarUserService = {
  create,
  update,
  getById,
  remove,
  getByUserId,
};
