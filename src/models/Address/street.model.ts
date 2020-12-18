import { deserialize } from "class-transformer";
import { getRepository } from "typeorm";
import { HandelStatus } from "../../config/HandelStatus";
import {
  StreetGetDto,
  StreetInputDto,
  StreetsOfDistrict,
} from "../../dto/Adress/street.dto";
import { District } from "../../entity/address/District";
import { Street } from "../../entity/address/Street";
import { mapObject } from "../../utils/map";

const create = async (input: StreetInputDto) => {
  if (!input || !input.code || !input.districtCode || !input.name)
    return HandelStatus(400);

  let streetRepo = getRepository(Street);
  let districtRepo = getRepository(District);
  let street = deserialize(Street, JSON.stringify(input), {
    excludeExtraneousValues: true,
  });
  let streetFind = await streetRepo.findOne({ code: input.code });
  if (streetFind) return HandelStatus(302, "Mã code đã tồn tại");
  let districts = await districtRepo.findOne({ code: input.districtCode });
  if (!districts) return HandelStatus(404, "Mã huyện k hợp lệ");

  street.districts = districts;
  try {
    await streetRepo.save(street);
    return HandelStatus(200);
  } catch (e) {
    console.log(e);

    return HandelStatus(500, e);
  }
};
const getAllByDistrictId = async (districtId: number) => {
  if (!districtId) return HandelStatus(400);
  let districtRepo = getRepository(District);
  let district = await districtRepo.findOne({
    relations: ["streets"],
    where: { id: districtId },
  });
  if (!district) {
    return HandelStatus(404);
  }
  let result = deserialize(StreetsOfDistrict, JSON.stringify(district), {
    excludeExtraneousValues: true,
  });
  return HandelStatus(200, null, result);
};
const getById = async (id: number) => {
  if (!id) return HandelStatus(400);
  let streetRepo = getRepository(Street);
  let street = await streetRepo.findOne({
    relations: [],
    where: {
      id: id,
    },
  });

  let result = deserialize(StreetGetDto, JSON.stringify(street), {
    excludeExtraneousValues: true,
  });

  return HandelStatus(200, null, result);
};
const update = async (input: StreetInputDto) => {
  if (!input || !input.id) return HandelStatus(400);
  let streetRepo = getRepository(Street);
  let street = await streetRepo.findOne(input.id);
  if (!street) return HandelStatus(404);
  street = mapObject(street, input);
  try {
    await streetRepo.update(input.id, street);
    return HandelStatus(200);
  } catch (e) {
    return HandelStatus(500, e.name);
  }
};
const remove = async (id: number) => {
  try {
    await getRepository(Street).delete(id || -1);
    return HandelStatus(200);
  } catch (e) {
    return HandelStatus(500, e.name);
  }
};
export const StreetService = {
  create,
  getById,
  getAllByDistrictId,
  remove,
  update,
};
