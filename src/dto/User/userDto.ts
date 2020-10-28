import { Role } from "../../entity/user/Role";
import { User } from "../../entity/user/User";

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

  delete_at: Date;
  userChild: User[];
}
export class UserGetDto {
  id: number;
  username: string;
  isBlock: boolean;
  isApprove: boolean;
}
