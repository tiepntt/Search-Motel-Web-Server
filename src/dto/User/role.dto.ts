import { Expose } from "class-transformer";

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
  @Expose()
  isCreateApartment: boolean;
  @Expose()
  isEditApartment: boolean;
  @Expose()
  isReport: boolean;
  @Expose()
  isCreateOrEditComment: boolean;
}
export class RoleDto {
  @Expose()
  id: number;
  @Expose()
  code: string;
  @Expose()
  name: string;
}
