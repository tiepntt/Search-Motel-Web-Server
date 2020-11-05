import { Expose, Type } from "class-transformer";
import { DistrictDto } from "../Adress/district.dto";
import { LocationTitleGetDto } from "../Adress/location.dto";
import { ProvinceGetDto } from "../Adress/province.dto";
import { StreetGetDto } from "../Adress/street.dto";
import { WardGetDto } from "../Adress/ward.dto";
import { UserDto, UserGetDto, UserTitleDto } from "../User/user.dto";
import { ApartmentDetailGetDto } from "./apartmentDetail.dto";
import { ApartmentTypeGetDto } from "./apartmentType.dto";

export class ApartmentInputDto {
  title: string;
  description: string;
  price: number;
  userId: number;
  type: number;
  provinceId: number;
  districtId: number;
  wardId: number;
  streetId: number;
  streetNo: string;
  LocationsNearCode: string[];
  avatar: string;
}
export class ApartmentDeletedDto {
  @Expose()
  id: number;
  @Expose()
  title: string;
  @Expose()
  description: string;
  @Expose()
  price: number;
  @Expose()
  create_at: Date;
  @Expose()
  delete_at: Date;
  @Expose()
  @Type((type) => UserTitleDto)
  user: UserTitleDto;
  @Expose()
  @Type((type) => UserTitleDto)
  userDeleted: UserTitleDto;
}
export class ApartmentTitleDto {
  @Expose()
  id: number;
  @Expose()
  title: string;
  @Expose()
  price: number;
}
export class ApartmentGetDto {
  @Expose()
  id: number;
  @Expose()
  title: string;
  @Expose()
  description: string;
  @Expose()
  price: number;
  @Expose()
  create_at: Date;
  @Expose()
  @Type((type) => UserDto)
  user: UserDto;
  @Expose()
  isApprove: boolean;
  @Expose()
  approve_at: Date;
  @Expose()
  deadline: Date;
  @Expose()
  @Type((type) => UserDto)
  userApprove: UserDto;
  @Type((type) => ApartmentTypeGetDto)
  type: ApartmentTypeGetDto;
  @Expose()
  @Type((type) => ProvinceGetDto)
  province: ProvinceGetDto;
  @Expose()
  @Type((type) => DistrictDto)
  district: DistrictDto;
  @Expose()
  @Type((type) => WardGetDto)
  ward: WardGetDto;
  @Expose()
  @Type((type) => StreetGetDto)
  street: StreetGetDto;
  @Expose()
  streetNo: string;
  @Expose()
  @Type((type) => LocationTitleGetDto)
  LocationsNear: LocationTitleGetDto[];
  @Expose()
  avatar: string;
  @Expose()
  @Type((type) => ApartmentDetailGetDto)
  apartmentDetail: ApartmentDetailGetDto;
}
export class ApartmentApproveDto {
  @Expose()
  id: number;
  @Expose()
  title: string;
  @Expose()
  price: number;
  @Expose()
  @Type((type) => ProvinceGetDto)
  province: ProvinceGetDto;
  @Expose()
  @Type((type) => DistrictDto)
  district: DistrictDto;
  @Expose()
  @Type((type) => WardGetDto)
  ward: WardGetDto;
  @Expose()
  @Type((type) => StreetGetDto)
  street: StreetGetDto;
  @Expose()
  streetNo: string;
  @Expose()
  avatar: string;
  @Expose()
  @Type((type) => UserTitleDto)
  user: UserTitleDto;
}
