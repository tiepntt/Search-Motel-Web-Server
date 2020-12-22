import { getRepository } from "typeorm";
import { Location } from "../../entity/address/Location";
import { HandelStatus } from "../../config/HandelStatus";
import { Province } from "../../entity/address/Province";
import {
  classToClass,
  deserializeArray,
  plainToClass,
} from "class-transformer";
import {
  LocationGetDto,
  LocationCreateDto,
  LocationUpdateDto,
  LocationOfDistrictDto,
} from "../../dto/Adress/location.dto";
import { District } from "../../entity/address/District";
import { mapObject } from "../../utils/map";
import { HintService } from "./hint.model";

const getAllByProvinceId = async (provinceId: number) => {
  let provinceRepo = getRepository(Province);

  if (!provinceId) return HandelStatus(400);

  let province = await provinceRepo.findOne({
    relations: ["locations"],
    where: {
      id: provinceId,
    },
  });
  if (!province) return HandelStatus(404, "Không tìm thấy dữ liệu Tỉnh.");

  let result = deserializeArray(
    LocationOfDistrictDto,
    JSON.stringify(province),
    {
      excludeExtraneousValues: true,
    }
  );
  return HandelStatus(200, null, result);
};
const getAllByDistrictId = async (districtId: number) => {
  let districtRepo = getRepository(District);
  if (!districtId) return HandelStatus(400);

  let district = await districtRepo.findOne({
    relations: ["locations"],
    where: {
      id: districtId,
    },
  });
  if (!district) return HandelStatus(404, "Không tìm thấy dữ liệu Quận/Huyện.");
  let result = plainToClass(LocationOfDistrictDto, district, {
    excludeExtraneousValues: true,
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

  if (!input || !input.districtCode || !input.provinceCode)
    return HandelStatus(400);
  let province = await provinceRepo.findOne({ code: input.provinceCode });
  let district = await districtRepo.findOne({ code: input.districtCode });
  let valid = province && district;
  if (!valid)
    return HandelStatus(404, "Dữ liệu tỉnh/quận/phường không chính xác");
  let location = plainToClass(Location, input);
  location.province = province;
  location.district = district;

  try {
    await locationRepo.save(location);
    HintService.add({
      name: input.name,
      provinceName: province.name,
      districtName: district.name,
    });
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
  let province = await provinceRepo.findOne({ code: input.provinceCode });
  let district = await districtRepo.findOne({ code: input.districtCode });
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
