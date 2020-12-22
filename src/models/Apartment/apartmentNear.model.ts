import { utc } from "moment";
import { getRepository } from "typeorm";
import { Location } from "../../entity/address/Location";
import { Apartment } from "../../entity/apartment/apartment";
import { ApartmentNear } from "../../entity/apartment/apartmentNearLocation";

const createMany = async (apartment: Apartment, nearId: number[]) => {
  let apartmentNearRepo = getRepository(ApartmentNear);
  let allNear = await apartmentNearRepo.find({ apartment: apartment });
  await apartmentNearRepo.remove(allNear);
  let output = [];
  for (let e of nearId) {
    let near = new ApartmentNear();
    let location = await getRepository(Location).findOne(e);
    let nearGet = await apartmentNearRepo.findOne({
      apartment: apartment,
      location: location,
    });
    near.apartment = apartment;
    apartment.hint += "," + location.name;
    if (!location || nearGet) {
      continue;
    }
    near.location = location;

    try {
      await apartmentNearRepo.save(near);
      output.push(near);
    } catch (e) {
      console.log(e);
    }
  }
  await getRepository(Apartment).save(apartment);
  return output;
};
export const LocationNearService = {
  createMany,
};
