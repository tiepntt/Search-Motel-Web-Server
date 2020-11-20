import { plainToClass } from "class-transformer";
import { getRepository } from "typeorm";
import { HandelStatus } from "../../../config/HandelStatus";
import { ApartmentTypeGetDto } from "../../../dto/Apartment/apartmentType.dto";
import { ApartmentType } from "../../../entity/apartment/apartmentType";

export const getAll = async () => {
  let apartmentTypes = await getRepository(ApartmentType).find();
  try {
    let result = plainToClass(ApartmentTypeGetDto, apartmentTypes, {
      excludeExtraneousValues: true,
    });
    return HandelStatus(200, null, result);
  } catch (e) {
    return HandelStatus(500);
  }
};
export const ApartmentTypeSerive = {
  getAll,
};
