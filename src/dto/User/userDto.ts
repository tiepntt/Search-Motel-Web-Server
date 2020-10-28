export interface UserDto {
  id: number;

  username: string;

  password: string;

  create_at: Date;

  update_at: Date;

  isBlock: boolean;
  isAprove: boolean;
}
export interface UserGetDto {
  readonly id: number;
  readonly username: string;
  readonly isBlock: boolean;
  readonly isAprove: boolean;
}
