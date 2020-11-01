import { Expose } from "class-transformer";

export class AvatarUserDto {
  @Expose()
  id: number;
  @Expose()
  url: string;
  userId: number;
}
