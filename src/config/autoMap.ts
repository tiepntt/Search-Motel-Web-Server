import { MappingPair, MapperConfiguration } from "@dynamic-mapper/mapper";
import { UserDetail, UserDto, UserGetDto } from "../dto/User/userDto";
import { User } from "../entity/user/User";

export const UserMapperDto = new MappingPair<User, UserGetDto>();
export const DtoMapperUser = new MappingPair<UserDto, User>();
export const UserMapperUserDetail = new MappingPair<User, UserDetail>();
const configuration = new MapperConfiguration((cfg) => {
  cfg.createMap(UserMapperDto, {});
  cfg.createAutoMap(DtoMapperUser, {});
  cfg.createAutoMap(UserMapperUserDetail, {});
});

const mapper = configuration.createMapper();
export default mapper;
