import { Expose, Type } from "class-transformer";
import { DistrictDto } from "./district.dto";

export class ProvinceInputDto {
  @Expose()
  id: number;
  @Expose()
  code: string;
  @Expose()
  name: string;
}

export class ProvinceGetDto {
  @Expose()
  id: number;
  @Expose()
  code: string;
  @Expose()
  name: string;
}
