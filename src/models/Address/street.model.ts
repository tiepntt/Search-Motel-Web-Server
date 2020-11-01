import { deserialize, plainToClass } from "class-transformer";
import { Any, getRepository, In, LessThan } from "typeorm";
import { HandelStatus } from "../../config/HandelStatus";
import { DistrictDto } from "../../dto/Adress/district.dto";
import {
  StreetGetDto,
  StreetInputDto,
  StreetsOfDistrict,
} from "../../dto/Adress/street.dto";
import { District } from "../../entity/address/District";
import { Street } from "../../entity/address/Street";

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
  let districts = await districtRepo.find({ code: In(input.districtCode) });
  if (!districts || districts.length === 0)
    return HandelStatus(404, "Mã huyện k hợp lệ");

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
  let district = await districtRepo
    .createQueryBuilder("district")
    .leftJoinAndSelect("district.streets", "streets")
    .where("district.id=:id", { id: districtId })
    .getOne();
  let result = deserialize(StreetsOfDistrict, JSON.stringify(district), {
    excludeExtraneousValues: true,
  });
  return HandelStatus(200, null, result);
};
const getById = async (id: number) => {
  if (!id) return HandelStatus(400);
  let streetRepo = getRepository(Street);
  let street = await streetRepo
    .createQueryBuilder("street")
    .leftJoinAndSelect("street.districts", "districts")
    .where("street.id=:id", { id: id })
    .getOne();

  let result = deserialize(StreetGetDto, JSON.stringify(street), {
    excludeExtraneousValues: true,
  });

  return HandelStatus(200, null, result);
};
const update = (input: StreetInputDto) => {};
const remove = (id: number) => {};
export const StreetService = {
  create,
  getById,
  getAllByDistrictId,
  remove,
  update,
};
