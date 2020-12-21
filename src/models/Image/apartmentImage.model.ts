import { plainToClass } from "class-transformer";
import { getRepository } from "typeorm";
import { HandelStatus } from "../../config/HandelStatus";
import { ApartmentImageDto } from "../../dto/Image/apartmentImages.dto";
import { ApartmentImage } from "../../entity/image/apartmentImage";
import { FileService } from "../../services/file/file.service";

const create = async (input: ApartmentImageDto) => {
  if (!input.url) return HandelStatus(404);
  let apartmentImageRepo = getRepository(ApartmentImage);
  let apartmentImage = plainToClass(ApartmentImage, input);
  try {
    await apartmentImageRepo.save(apartmentImage);
    return HandelStatus(200, null, { id: apartmentImage.id, url: input.url });
  } catch (e) {
    return HandelStatus(500, e);
  }
};
const update = async (input: ApartmentImageDto) => {};
const getById = async (id: number) => {};
const remove = async (id: number) => {
  let img = await getRepository(ApartmentImage).findOne(id);
  if (!img) return HandelStatus(404);
  let result = await FileService.removeFile(img.folder);
  if (result != 200) return HandelStatus(500);
  try {
    await getRepository(ApartmentImage).remove(img);
    return HandelStatus(200);
  } catch (e) {
    return HandelStatus(500);
  }
};
export const ImageApartmentService = { create, update, getById, remove };
