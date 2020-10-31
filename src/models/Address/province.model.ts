import {
  deserialize,
  plainToClass,
  plainToClassFromExist,
} from "class-transformer";
import { getRepository } from "typeorm";
import { HandelStatus } from "../../config/HandelStatus";
import {
  ProvinceGetDto,
  ProvinceInputDto,
} from "../../dto/Adress/province.dto";
import { Province } from "../../entity/address/Province";
import { mapObject } from "../../utils/map";

export const getAll = async () => {
  let provinceRepo = getRepository(Province);
  let provinces = await provinceRepo.find();
  let result = plainToClassFromExist(ProvinceGetDto, provinces, {
    excludeExtraneousValues: false,
  });
  return HandelStatus(200, null, result);
};
export const getById = async (id: number) => {
  let provinceRepo = getRepository(Province);
  let provinces = await provinceRepo.findOne(id);
  if (!provinces) return HandelStatus(404);
  let result = deserialize(ProvinceGetDto, JSON.stringify(provinces), {
    excludeExtraneousValues: false,
  });
  return HandelStatus(200, null, result);
};
export const create = async (input: ProvinceInputDto) => {
  if (!input || !input.name || !input.code) return HandelStatus(400);
  let provinceRepo = getRepository(Province);
  let province = plainToClass(Province, input);
  let provinceGet = await provinceRepo.findOne({ code: input.code });
  if (provinceGet) return HandelStatus(302);
  try {
    await provinceRepo.save(province);
    return HandelStatus(200);
  } catch (e) {
    return HandelStatus(500, e.name);
  }
};
export const update = async (input: ProvinceGetDto) => {
  if (!input || !input.id) return HandelStatus(400);
  let provinceRepo = getRepository(Province);
  let province = await provinceRepo.findOne(input.id);
  if (!province) return HandelStatus(404);
  let dataUpdate = mapObject(province, input);
  try {
    await provinceRepo.update(input.id, dataUpdate);
    return HandelStatus(200);
  } catch (e) {
    return HandelStatus(500, e.name);
  }
};
export const remove = async (id: number) => {
  if (!id) return HandelStatus(400);
  let provinceRepo = getRepository(Province);
  let province = await provinceRepo.findOne(id);
  if (!province) return HandelStatus(404);
  try {
    await provinceRepo.remove(province);
    return HandelStatus(200);
  } catch (e) {
    return HandelStatus(500, e.name);
  }
};

export const ProvinceService = { getAll, getById, create, update, remove };
