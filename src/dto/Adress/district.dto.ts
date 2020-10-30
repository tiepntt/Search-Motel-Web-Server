import { Expose, Type } from "class-transformer";

export class DistrictInputDto {
  id: number;
  code: string;
  name: string;
  provinceId: number;
}
export class DistrictDto {
  @Expose()
  id: number;
  @Expose()
  code: string;
  @Expose()
  name: string;
}
export class DistrictForProvineDto {
  @Expose()
  id: number;
  @Expose()
  code: string;
  @Expose()
  name: string;
  @Expose()
  @Type((type) => DistrictDto)
  districts: DistrictDto[];
}
