import { Expose } from "class-transformer";

export class HintDto {
  @Expose()
  id?: string;
  @Expose()
  name: string;
  provinceName?: string;
  districtName?: string;
  wardName?: string;
}
