export class RoleDto {
  id: number;

  code: string;

  name: string;

  description: string;

  isApproveApartment: boolean;

  isApproveUser: boolean;

  isApproveComment: boolean;

  isManager: boolean;

  create_at: Date;

  update_at: Date;
}
