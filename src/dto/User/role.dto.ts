import { Exclude, Expose } from "class-transformer";

export class RoleDtoDetails {
  @Expose()
  id: number;
  @Expose()
  code: string;
  @Expose()
  name: string;
  @Expose()
  description: string;
  @Expose()
  isApproveApartment: boolean;
  @Expose()
  isApproveUser: boolean;
  @Expose()
  isApproveComment: boolean;
  @Expose()
  isManager: boolean;
}
export class RoleDto {
  @Expose()
  id: number;
  @Expose()
  code: string;
  @Expose()
  name: string;
}
