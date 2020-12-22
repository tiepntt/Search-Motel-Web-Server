import { Expose, Type } from "class-transformer";
import { ApartmentImageDto } from "../Image/apartmentImages.dto";
import { KitchenTypeDto } from "./type/kitchenType.dto";
import { ToiletTypeDto } from "./type/toiletType.dto";
export class ApartmentDetailInputDto {
  @Expose()
  id?: number;
  @Expose()
  description: string;
  @Expose()
  apartmentId: number;
  @Expose()
  imagesId: number[];
  @Expose()
  toiletTypeId: number;
  @Expose()
  kitchenTypeId: number;
  @Expose()
  isHasAirConditioner: boolean;
  @Expose()
  isHasBalcony: boolean;
  @Expose()
  isHasElevator: boolean;
  @Expose()
  isHasFever: boolean;
  @Expose()
  acreage: number;
  @Expose()
  price: number;
  @Expose()
  priceElectricity: number;
  @Expose()
  priceWater: string;
  @Expose()
  isHasParking: boolean;
}
export class ApartmentDetailGetDto {
  @Expose()
  id: number;
  @Expose()
  description: string;
  @Expose()
  apartmentId: number;
  @Expose()
  @Type((type) => ApartmentImageDto)
  images: ApartmentImageDto[];
  @Expose()
  @Type((type) => ToiletTypeDto)
  toiletType: ToiletTypeDto;
  @Expose()
  @Type((type) => KitchenTypeDto)
  kitchenType: KitchenTypeDto;
  @Expose()
  isHasAirConditioner: boolean;
  @Expose()
  isHasBalcony: boolean;
  @Expose()
  isHasElevator: boolean;
  @Expose()
  isHasFever: boolean;
  @Expose()
  acreage: number;
  @Expose()
  price: number;
  @Expose()
  priceElectricity: number;
  @Expose()
  priceWater: string;
  @Expose()
  isHasParking: boolean;
}
