import { Expose } from "class-transformer";

export class ApartmentTypeGetDto {
  @Expose()
  id: number;
  @Expose()
  name: string;
  @Expose()
  code: string;
}
