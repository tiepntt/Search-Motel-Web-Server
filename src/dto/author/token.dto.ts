import { Expose, Type } from "class-transformer";
import { Role } from "../../entity/user/Role";
import { User } from "../../entity/user/User";
import { RoleDtoDetails } from "../User/role.dto";
import { UserDto, UserTitleDto } from "../User/user.dto";

export class TokenInputDto {
  @Expose()
  userId: number;
  @Expose()
  roleId: number;
}
export class TokenDto {
  @Expose()
  id: number;
  @Expose()
  @Type((type) => UserTitleDto)
  user: UserTitleDto;
  @Expose()
  @Type((type) => RoleDtoDetails)
  role: RoleDtoDetails;
}
