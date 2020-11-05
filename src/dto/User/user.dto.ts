import { mapping } from "auto-mapping";
import { Exclude, Expose, Type } from "class-transformer";
import { ContactUser } from "../../entity/user/Contact";
import { Role } from "../../entity/user/Role";
import { User } from "../../entity/user/User";
import { AvatarUserDto } from "../Image/avatarUser.dto";
import { ContactDto } from "./contact.dto";
import { RoleDto, RoleDtoDetails } from "./role.dto";

export class UserDto {
  id: number;
  name: string;
  email: string;
  password: string;
  create_at: Date;
  update_at: Date;
  isBlock: boolean;
  isApprove: boolean;
  roleId: number;
  userManagerCode: string;
  role: Role;
  userManager: User;
  contact: ContactUser;
  delete_at: Date;
  userChild: User[];
}
export class UserInputDto {
  @Expose()
  name: string;
  @Expose()
  email: string;
  @Expose()
  password: string;
  @Expose()
  roleId: number;
  @Expose()
  managerId: number;
}
export class UserLogin {
  email: string;
  password: string;
}
export class UserUpdateDto {
  @Expose()
  id: number;
  @Expose()
  name: string;
  @Expose()
  password: string;
}
export class UserGetDto {
  @Expose()
  id: number;
  @Expose()
  name: string;
  @Expose()
  email: string;
  @Expose()
  isBlock: boolean;
  @Expose()
  isApprove: boolean;
  @Expose()
  @Type((type) => AvatarUserDto)
  avatar: AvatarUserDto;
  @Expose()
  @Type((type) => RoleDto)
  role: RoleDto;
  @Expose()
  @Type((type) => ContactDto)
  contactUser: ContactDto;
}

export class UserTitleDto {
  @Expose()
  id: number;
  @Expose()
  name: string;
  @Expose()
  email: string;
}
export class AccountDto {
  @Expose()
  id: number;
  @Expose()
  name: string;
  @Expose()
  email: string;
  @Expose()
  @Type(() => RoleDtoDetails, {})
  role: RoleDtoDetails;
  @Expose()
  isBlock: boolean;
  @Expose()
  isApprove: boolean;
}
export class UserDetailDto {
  @Expose()
  id: number;
  @Expose()
  email: string;
  @Expose()
  name: string;
  @Expose()
  create_at: Date;
  @Expose()
  loginType: string;
  @Expose()
  isBlock: boolean;
  @Expose()
  isApprove: boolean;
  @Expose()
  @Type(() => RoleDto, {})
  role: RoleDto;
  @Expose()
  @Type(() => UserTitleDto, {})
  userManager: UserTitleDto;
  @Expose()
  @Type(() => ContactDto, {})
  contactUser: ContactDto;
  @Expose()
  @Type(() => AvatarUserDto, {})
  avatar: AvatarUserDto;
}
