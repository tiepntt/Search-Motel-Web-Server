import { Expose } from "class-transformer";

export class ApartmentImageDto {
  @Expose()
  id: number;
  @Expose()
  url: string;
  @Expose()
  folder: string;
  apartmentDetailId: string;
}
