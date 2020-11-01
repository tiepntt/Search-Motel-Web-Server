import { Expose } from "class-transformer";

export class KitchenTypeDto {
  @Expose()
  id: string;
  @Expose()
  name: string;
  @Expose()
  code: string;
}
