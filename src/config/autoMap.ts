import { MappingPair, MapperConfiguration } from "@dynamic-mapper/mapper";
import { Type } from "@dynamic-mapper/mapper/lib/interface";
import { UserDto, UserGetDto } from "../dto/User/user.dto";
import { User } from "../entity/user/User";

export const UserMapperDto = new MappingPair<User, UserGetDto>();
export const DtoMapperUser = new MappingPair<UserDto, User>();
const configuration = new MapperConfiguration((cfg) => {
  cfg.createAutoMap(UserMapperDto, {});
});

const mapper = configuration.createMapper();
export default mapper;
export class DomainConverter {
  static fromDto<T>(domain: Type<T>, dto: any) {
    const instance = Object.create(domain.prototype);
    instance.state = dto;
    return instance as T;
  }
}
