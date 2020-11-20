import { deserialize, plainToClass } from "class-transformer";
import { getRepository } from "typeorm";
import { HandelStatus } from "../../config/HandelStatus";
import { WardInputDto, WardsOfDistrictDto } from "../../dto/Adress/ward.dto";
import { District } from "../../entity/address/District";
import { Ward } from "../../entity/address/Ward";
import { mapObject } from "../../utils/map";

const getAllByDistrictId = async (districtId: number) => {
  if (!districtId) return HandelStatus(400);
  let districtRepo = getRepository(District);
  let district = await districtRepo
    .createQueryBuilder("district")
    .leftJoinAndSelect("district.wards", "wards")
    .where("district.id = :id", { id: districtId || -1 })
    .getOne();
  if (!district) return HandelStatus(404);
  let result = deserialize(WardsOfDistrictDto, JSON.stringify(district), {
    excludeExtraneousValues: true,
  });
  return HandelStatus(200, null, result);
};
const getById = async (id: number) => {
  if (!id) return HandelStatus(400);
  let wardRepo = getRepository(Ward);
  let ward = await wardRepo.findOne(id);
  if (!ward) return HandelStatus(404);
  return HandelStatus(200, null, ward);
};
const create = async (input: WardInputDto) => {
  if (!input || !input.code || !input.districtCode || !input.name)
    return HandelStatus(400);
  let wardRepo = getRepository(Ward);
  let districtRepo = getRepository(District);
  let district = await districtRepo.findOne({ code: input.districtCode });
  if (!district) return HandelStatus(404, "Dữ liệu quận/huyện không tồn tại");
  let ward = plainToClass(Ward, input);
  ward.district = district;
  try {
    await wardRepo.save(ward);
    return HandelStatus(200);
  } catch (e) {
    return HandelStatus(500, e.name);
  }
};
const update = async (input: WardInputDto) => {
  if (!input || !input.id) return HandelStatus(400);
  let wardRepo = getRepository(Ward);
  let ward = await wardRepo.findOne(input.id);
  if (!ward) return HandelStatus(404);
  ward = mapObject(ward, input);
  try {
    await wardRepo.update(input.id, ward);
    return HandelStatus(200);
  } catch (e) {
    return HandelStatus(500, e.name);
  }
};
const remove = async (id: number) => {
  try {
    await getRepository(Ward).delete(id || -1);
    return HandelStatus(200);
  } catch (e) {
    return HandelStatus(500, e.name);
  }
};
export const WardService = {
  create,
  getById,
  update,
  remove,
  getAllByDistrictId,
};
