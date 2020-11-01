import { Exclude, Expose } from "class-transformer";

export class ToiletTypeDto {
  @Expose()
  id: string;
  @Expose()
  name: string;
  @Expose()
  code: string;
}
