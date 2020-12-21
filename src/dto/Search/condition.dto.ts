import { Exclude, Expose } from "class-transformer";

export class ConditionApartmentSearch {
  minPrice = 0;
  maxPrice = 1000000000;
  minS = 0;
  maxS = 1000;
  apartmentTypeId = null;
  provinceId = 1;
  districtId = null;
  wardId = null;
  streetId = null;
  nearLocation = [];
  take: number;
  skip: number;
}
