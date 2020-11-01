import { Type } from "class-transformer";
import { type } from "os";
import { DistrictDto } from "./district.dto";
import { ProvinceGetDto } from "./province.dto";
import { StreetGetDto } from "./street.dto";
import { WardGetDto } from "./ward.dto";
export class LocationInputDto {
  name: string;
  description: string;
  provinceCode: number;
  districtCode: number;
  wardCode: number;
  streetCode: number;
  streetNo: string;
}
export class LocationGetDto {
  id: number;
  name: string;
  description: string;
  @Type((type) => ProvinceGetDto)
  province: ProvinceGetDto;
  @Type((type) => DistrictDto)
  district: DistrictDto;
  @Type((type) => WardGetDto)
  ward: WardGetDto;
  @Type((type) => StreetGetDto)
  street: StreetGetDto;
  streetNo: string;
}
export class LocationTitleGetDto {
  id: number;
  name: string;
  description: string;
}
