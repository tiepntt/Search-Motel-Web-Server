import { Expose, Type } from "class-transformer";
import { DistrictDto } from "./district.dto";
import { ProvinceGetDto } from "./province.dto";
import { StreetGetDto } from "./street.dto";
import { WardGetDto } from "./ward.dto";
export class LocationCreateDto {
  code: string;
  name: string;
  description: string;
  provinceCode: string;
  districtCode: string;
  wardCode: string;
  streetCode: string;
  streetNo: string;
}
export class LocationUpdateDto {
  code: string;
  id: number;
  name: string;
  description: string;
  provinceCode: string;
  districtCode: string;
  wardCode: string;
  streetCode: string;
  streetNo: string;
}
export class LocationGetDto {
  @Expose()
  id: number;
  @Expose()
  name: string;
  @Expose()
  description: string;
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
}
export class LocationOfDistrictDto {
  @Expose()
  id: number;
  @Expose()
  name: string;
  @Expose()
  code: string;
  @Expose()
  @Type((type) => LocationTitleGetDto)
  locations: LocationTitleGetDto[];
}
export class LocationTitleGetDto {
  @Expose()
  id: number;
  @Expose()
  name: string;
  @Expose()
  description: string;
}
