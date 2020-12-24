import { Expose } from "class-transformer";

export class PriceDto {
  @Expose()
  id: number;
  @Expose()
  code: string;
  @Expose()
  name: string;
  @Expose()
  time: number;
  @Expose()
  price: number;
}
