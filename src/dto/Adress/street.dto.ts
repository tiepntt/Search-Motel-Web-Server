import { Expose, Type } from "class-transformer";
import { DistrictDto } from "./district.dto";

export class StreetInputDto {
  id: number;
  code: string;
  name: string;
  districtCode: string;
}
export class StreetGetDto {
  @Expose()
  id: number;
  @Expose()
  code: string;
  @Expose()
  name: string;
  @Expose()
  @Type((type) => DistrictDto)
  districts: DistrictDto;
}
export class StreetsOfDistrict {
  @Expose()
  id: number;
  @Expose()
  code: string;
  @Expose()
  name: string;
  @Expose()
  @Type((type) => StreetGetDto)
  streets: StreetGetDto[];
}
