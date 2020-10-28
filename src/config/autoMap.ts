import { MappingPair, MapperConfiguration } from "@dynamic-mapper/mapper";
import { UserDto, UserGetDto } from "../dto/User/userDto";
import { User } from "../entity/user/User";

export const UserMapperDto = new MappingPair<User, UserGetDto>();
export const DtoMapperUser = new MappingPair<UserDto, User>();
const configuration = new MapperConfiguration((cfg) => {
  cfg.createAutoMap(UserMapperDto, {});
  cfg.createAutoMap(DtoMapperUser, {});
});

const mapper = configuration.createMapper();
export default mapper;
