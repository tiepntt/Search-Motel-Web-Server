import { Expose, Type } from "class-transformer";
import { UserTitleDto } from "../User/user.dto";
import { ApartmentTitleDto } from "./apartment.dto";

export class ApartmentReportInputDto {
  @Expose()
  id: number;
  @Expose()
  content: string;
  @Expose()
  userId: number;
  @Expose()
  apartmentId: number;
}
export class ApartmentReportGetDto {
  @Expose()
  id: number;
  @Expose()
  create_at: Date;
  @Expose()
  content: string;
  @Expose()
  isApprove: boolean;
  @Expose()
  @Type((type) => UserTitleDto)
  user: UserTitleDto;
  @Expose()
  @Type((type) => ApartmentTitleDto)
  apartment: ApartmentTitleDto;
}
export class ApartmentReportDto {
  @Expose()
  id: number;
  @Expose()
  title: string;
  @Expose()
  price: number;
  @Expose()
  reportCount: number;
}
