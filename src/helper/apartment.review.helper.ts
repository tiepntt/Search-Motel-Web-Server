import { getRepository } from "typeorm";
import { Apartment } from "../entity/apartment/apartment";
import { ApartmentReview } from "../entity/apartment/apartmentReview";

const getCountByApartment = async (apartment: Apartment) => {
  try {
    let count = await getRepository(ApartmentReview).count({
      apartment: apartment,
    });
    return count;
  } catch (e) {
    console.log(e);
    return 0;
  }
};
export const ApartmentReviewHelper = { getCountByApartment };
