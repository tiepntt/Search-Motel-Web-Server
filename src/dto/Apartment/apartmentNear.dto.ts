import { Expose, Type } from "class-transformer";
import { LocationGetDto, LocationTitleGetDto } from "../Adress/location.dto";

export class ApartmentNearDto {
  @Expose()
  id: number;
  @Expose()
  @Type((type) => LocationTitleGetDto)
  location: LocationTitleGetDto[];
}
