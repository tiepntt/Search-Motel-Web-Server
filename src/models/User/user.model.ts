import { getRepository } from "typeorm";
import mapper, { DtoMapperUser, UserMapperDto } from "../../config/autoMap";
import { UserDto, UserGetDto } from "../../dto/User/userDto";
import { User } from "../../entity/user/User";

const getAll = async () => {
  let userRepo = getRepository(User);
  let user = await userRepo.find();
  let userRes = mapper.map(UserMapperDto, user);
  console.log(userRes as UserGetDto[]);

  return userRes;
};
const create = async (userConfig: UserDto) => {
  let userRepo = getRepository(User);
  let user = mapper.map(DtoMapperUser, userConfig);
  await userRepo.save(user);
  return 200;
};
export const UserService = { getAll, create };
