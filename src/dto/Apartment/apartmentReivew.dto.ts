import { Expose, Type } from "class-transformer";
import { UserDto, UserTitleDto } from "../User/user.dto";

export class ApartmentReviewInputDto {
  id: number;
  content: string;
  star: number;
  userId: number;
  apartmentId: number;
}
export class ApartmentReviewGetDto {
  @Expose()
  id: number;
  @Expose()
  content: string;
  @Expose()
  star: number;
  @Expose()
  ceate_at: Date;
  @Expose()
  @Type((type) => UserTitleDto)
  user: UserTitleDto;
}
