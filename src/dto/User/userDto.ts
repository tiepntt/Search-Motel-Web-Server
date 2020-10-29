import { ContactUser } from "../../entity/user/Contact";
import { Role } from "../../entity/user/Role";
import { User } from "../../entity/user/User";
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
export class UserGetDto {
  id: number;
  username: string;
  isBlock: boolean;
  isApprove: boolean;
}
export class UserDetail {
  username: string;
  password: string;
  create_at: Date;
}
