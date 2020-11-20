import { plainToClass } from "class-transformer";
import { getRepository } from "typeorm";
import { HandelStatus } from "../../config/HandelStatus";
import { ApartmentImageDto } from "../../dto/Image/apartmentImages.dto";
import { ApartmentImage } from "../../entity/image/apartmentImage";

const create = async (input: ApartmentImageDto) => {
  if (!input.url) return HandelStatus(404);
  let apartmentImageRepo = getRepository(ApartmentImage);
  let apartmentImage = plainToClass(ApartmentImage, input);
  try {
    await apartmentImageRepo.save(apartmentImage);
    return HandelStatus(200, null, { id: apartmentImage.id });
  } catch (e) {
    return HandelStatus(500, e);
  }
};
const update = async (input: ApartmentImageDto) => {};
const getById = async (id: number) => {};
const remove = async (id: number) => {};
export const ImageApartmentService = { create, update, getById, remove };
