import { mapping } from "auto-mapping";
import { Exclude, Expose, Type } from "class-transformer";
import { ContactUser } from "../../entity/user/Contact";
import { Role } from "../../entity/user/Role";
import { User } from "../../entity/user/User";
import { AvatarUserDto } from "../Image/avatarUser.dto";
import { ContactDto } from "./contact.dto";
import { RoleDto } from "./role.dto";

export class UserDto {
  id: number;
  username: string;
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
  username: string;
  password: string;
  roleId: number;
}
export class UserGetDto {
  @Expose()
  id: number;
  @Expose()
  username: string;
  @Expose()
  isBlock: boolean;
  @Expose()
  isApprove: boolean;
  @Expose()
  @Type((type) => AvatarUserDto)
  avatar: AvatarUserDto;
}
export class UserTitleDto {
  @Expose()
  id: number;
  @Expose()
  username: string;
}
export class UserDetailDto {
  @Expose()
  id: number;
  @Expose()
  username: string;
  @Expose()
  create_at: Date;
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
