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
  roleId: number;
  userManagerCode: string;
  contact: ContactUser;
}
export class UserListDto {
  @Expose()
  id: number;
  @Expose()
  name: string;
  @Expose()
  email: string;
  @Expose()
  @Type((type) => UserTitleDto)
  userChild: UserTitleDto[];
}
export class UserInputDto {
  @Expose()
  name: string;
  @Expose()
  personNo: string;
  @Expose()
  email: string;
  @Expose()
  password: string;
  @Expose()
  roleId: number;
  @Expose()
  roleCode: string;
  @Expose()
  managerId: number;
  isApprove: boolean;
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
  email: string;
}
export class ChangePasswordDto {
  id: number;
  @Expose()
  oldPassword: string;
  @Expose()
  newPassword: string;
}
export class UserGetDto {
  @Expose()
  id: number;
  @Expose()
  name: string;
  @Expose()
  email: string;
  @Expose()
  personNo: string;
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
  @Expose()
  @Type((type) => UserTitleDto)
  userManager: UserTitleDto;
  @Expose()
  createAt?: Date;
}

export class UserTitleDto {
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
  create_at?: Date;
  @Expose()
  @Type(() => ContactDto, {})
  contactUser: ContactDto;

  @Expose()
  @Type(() => AvatarUserDto, {})
  avatar: AvatarUserDto;
}
export class UserAssignDto {
  @Expose()
  userId: number;
  @Expose()
  userAdminId: number;
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
  @Expose()
  @Type(() => AvatarUserDto, {})
  avatar: AvatarUserDto;
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
  @Expose()
  personNo: string;
}
