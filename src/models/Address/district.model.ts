import { deserializeArray, plainToClass } from "class-transformer";
import { getRepository } from "typeorm";
import { HandelStatus } from "../../config/HandelStatus";
import {
  DistrictForProvinceDto,
  DistrictInputDto,
} from "../../dto/Adress/district.dto";
import { District } from "../../entity/address/District";
import { Province } from "../../entity/address/Province";
import { mapObject } from "../../utils/map";
import { HintService } from "./hint.model";

const getAllByProvinceId = async (provinceId: number) => {
  if (!provinceId) return HandelStatus(400);
  let provinceRepo = getRepository(Province);
  let province = await provinceRepo.findOne(provinceId);
  if (!province) return HandelStatus(404, "K tìm thấy dữ liệu Tỉnh.");
  let districts = await provinceRepo
    .createQueryBuilder("province")
    .leftJoinAndSelect("province.districts", "districts")
    .where("province.id=:id", { id: provinceId })
    .getOne();
  if (!districts) return HandelStatus(404);
  let result = deserializeArray(
    DistrictForProvinceDto,
    JSON.stringify(districts),
    {
      excludeExtraneousValues: true,
    }
  );
  return HandelStatus(200, null, result);
};
const getById = async (id: number) => {
  if (!id) return HandelStatus(400);
  let districtRepo = getRepository(District);
  let distrirct = await districtRepo.findOne(id);
  if (!distrirct) return HandelStatus(404);
  return HandelStatus(200, null, distrirct);
};
const create = async (input: DistrictInputDto) => {
  if (!input || !input.code || !input.name || !input.provinceCode)
    return HandelStatus(400);
  let provinceRepo = getRepository(Province);
  let districtRepo = getRepository(District);
  let province = await provinceRepo.findOne({ code: input.provinceCode });
  let districtFind = await districtRepo.findOne({ code: input.code });
  if (districtFind) return HandelStatus(302);
  if (!province) return HandelStatus(404, "Dữ liệu tỉnh k tồn tại");
  let district = plainToClass(District, input);
  district.province = province;

  try {
    await districtRepo.save(district);
    HintService.add({
      name: input.name + "," + province.name,
      provinceName: province.name,
      districtName: input.name,
    });
    return HandelStatus(200);
  } catch (e) {
    return HandelStatus(500, e.name);
  }
};
const update = async (input: DistrictInputDto) => {
  if (!input || !input.id) return HandelStatus(400);
  let provinceRepo = getRepository(Province);
  let districtRepo = getRepository(District);
  let district = await districtRepo.findOne(input.id);
  if (!district) return HandelStatus(404);
  let province = await provinceRepo.findOne({
    code: input.provinceCode || "-1",
  });
  district.province = province || district.province;
  let districtUpdate = mapObject(district, input);
  district.streets = [];
  try {
    await districtRepo.update(input.id, districtUpdate);
    return HandelStatus(200);
  } catch (e) {
    return HandelStatus(500, e.name);
  }
};
const remove = async (id: number) => {
  try {
    await getRepository(District).delete(id || -1);
    return HandelStatus(200);
  } catch (e) {
    return HandelStatus(500, e);
  }
};

export const DistrictService = {
  create,
  getAllByProvinceId,
  getById,
  update,
  remove,
};
