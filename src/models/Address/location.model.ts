import { getRepository } from "typeorm";
import { Location } from "../../entity/address/Location";
import { HandelStatus } from "../../config/HandelStatus";
import { Province } from "../../entity/address/Province";
import {
  classToClass,
  classToClassFromExist,
  deserializeArray,
  plainToClass,
} from "class-transformer";
import {
  LocationGetDto,
  LocationCreateDto,
  LocationUpdateDto,
} from "../../dto/Adress/location.dto";
import { json } from "body-parser";
import { District } from "../../entity/address/District";
import { Street } from "../../entity/address/Street";
import { mapObject } from "../../utils/map";
import { print } from "util";

const getAllByProvinceId = async (provinceId: number) => {
  let provinceRepo = getRepository(Province);
  let locationRepo = getRepository(Location);
  if (!provinceId) return HandelStatus(400);

  let province = await provinceRepo.findOne(provinceId);
  if (!province) return HandelStatus(404, "Không tìm thấy dữ liệu Tỉnh.");

  let locations = await locationRepo
    .createQueryBuilder("location")
    .where("provinceId=:provinceId", { provinceId: provinceId })
    .getMany();
  let result = deserializeArray(LocationGetDto, JSON.stringify(locations), {
    excludeExtraneousValues: false,
  });
  return HandelStatus(200, null, result);
};
const getAllByDistrictId = async (districtId: number) => {
  let districtRepo = getRepository(District);
  let locationRepo = getRepository(Location);
  if (!districtId) return HandelStatus(400);

  let district = await districtRepo.findOne(districtId);
  if (!district) return HandelStatus(404, "Không tìm thấy dữ liệu Quận/Huyện.");

  let locations = await locationRepo
    .createQueryBuilder("location")
    .where("districtId=:districtId", { districtId: districtId })
    .getMany();
  let result = deserializeArray(LocationGetDto, JSON.stringify(locations), {
    excludeExtraneousValues: false,
  });
  return HandelStatus(200, null, result);
};

const getById = async (id: number) => {
  let locationRepo = getRepository(Location);
  if (!id) return HandelStatus(400);
  let location = await locationRepo.findOne(id);
  if (!location) return HandelStatus(404);
  let result = classToClass<LocationGetDto>(location, {
    excludeExtraneousValues: false,
  });
  return HandelStatus(200, null, result);
};

const create = async (input: LocationCreateDto) => {
  let provinceRepo = getRepository(Province);
  let districtRepo = getRepository(District);
  let locationRepo = getRepository(Location);
  let streetRepo = getRepository(Street);
  console.log(input);

  if (
    !input ||
    !input.wardCode ||
    !input.streetCode ||
    !input.districtCode ||
    !input.provinceCode
  )
    return HandelStatus(400);
  let province = await provinceRepo.findOne(input.provinceCode);
  let district = await districtRepo.findOne(input.districtCode);
  let valid = province && district; 
  if (!valid)
    return HandelStatus(404, "Dữ liệu tỉnh/quận/phường không chính xác");
  let location = plainToClass(Location, input);
  location.province = province;
  location.district = district;
  try {
    await locationRepo.save(location);
    return HandelStatus(200);
  } catch (e) {
    return HandelStatus(500, e.name);
  }
};

const update = async (input: LocationUpdateDto) => {
  let provinceRepo = getRepository(Province);
  let districtRepo = getRepository(District);
  let locationRepo = getRepository(Location);
  let id = input.id;
  if (!id || !(await locationRepo.findOne(id))) return HandelStatus(400);
  let province = await provinceRepo.findOne(input.provinceCode);
  let district = await districtRepo.findOne(input.districtCode);
  let valid = province && district; 
  if (!valid)
    return HandelStatus(404, "Dữ liệu tỉnh/quận/phường không chính xác");
  let oldLocation = await locationRepo.findOne(id);
  let newLocation = mapObject(oldLocation, input);
  let location = plainToClass(Location, newLocation);
  location.province = province;
  location.district = district;
  console.log(location);
  try {
    await locationRepo.update(id, location);
    return HandelStatus(200);
  } catch (e) {
    return HandelStatus(500, e.name);
  }
};

const remove = async (id: number) => {
  let locationRepo = getRepository(Location);
  if (!id || !(await locationRepo.findOne(id))) return HandelStatus(400);
  try {
    locationRepo.delete(id);
    return HandelStatus(200);
  } catch (e) {
    return HandelStatus(500, e.name);
  }
};
export const LocationService = {
  create,
  getAllByProvinceId,
  getAllByDistrictId,
  getById,
  update,
  remove,
};
