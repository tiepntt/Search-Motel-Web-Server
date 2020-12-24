import { getRepository } from "typeorm";
import { Apartment } from "../entity/apartment/apartment";
import { ApartmentReport } from "../entity/apartment/apartmentReport";

const getCountByApartment = async (apartment: Apartment) => {
  let count = await getRepository(ApartmentReport).count({
    apartment: apartment,
  });

  return count;
};
export const ApartmentReportHelper = { getCountByApartment };
