import { Expose, Type } from "class-transformer";

export class WardInputDto {
  id: number;
  code: string;
  name: string;
  districtId: number;
}
export class WardGetDto {
  @Expose()
  id: number;
  @Expose()
  code: string;
  @Expose()
  name: string;
}
export class WardsOfDistrictDto {
  @Expose()
  id: number;
  @Expose()
  code: string;
  @Expose()
  name: string;
  @Expose()
  @Type((type) => WardGetDto)
  wards: WardGetDto[];
}
