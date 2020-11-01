import { notEqual } from "assert";
import { deserialize, plainToClass } from "class-transformer";
import {
  Any,
  Between,
  getRepository,
  In,
  IsNull,
  MoreThan,
  Not,
  Repository,
} from "typeorm";
import { isNull, isUndefined } from "util";
import { HandelStatus } from "../../config/HandelStatus";
import {
  ApartmentGetDto,
  ApartmentInputDto,
} from "../../dto/Apartment/apartment.dto";
import { ConditionApartmentSearch } from "../../dto/Search/condition.dto";
import { District } from "../../entity/address/District";
import { Province } from "../../entity/address/Province";
import { Street } from "../../entity/address/Street";
import { Ward } from "../../entity/address/Ward";
import { Apartment } from "../../entity/apartment/apartment";
import { ApartmentType } from "../../entity/apartment/apartmentType";
import { User } from "../../entity/user/User";

const create = async (input: ApartmentInputDto) => {
  if (
    !input ||
    !input.provinceId ||
    !input.districtId ||
    !input.title ||
    !input.price
  )
    return HandelStatus(400);
  let apartmentRepo = getRepository(Apartment);
  let apartmentTypeRepo = getRepository(ApartmentType);
  let provinceRepo = getRepository(Province);
  let districtRepo = getRepository(District);
  let wardRepo = getRepository(Ward);
  let userRepo = getRepository(User);
  let streetRepo = getRepository(Street);
  let province = await provinceRepo.findOne(input.provinceId);
  if (!province) return HandelStatus(404, "Province Not Found");
  let district = await districtRepo.findOne({
    id: input.districtId,
  });
  let type = await apartmentTypeRepo.findOne(input.type);
  if (!type) return HandelStatus(404, "Apartment Type not Found");
  if (!district) return HandelStatus(404, "District Not Found");
  let ward = await wardRepo.findOne({
    id: input.wardId,
  });
  if (!ward) return HandelStatus(404, "Ward Not Found");
  let street = await streetRepo.findOne({
    id: input.streetId,
  });
  if (!street) return HandelStatus(404, "Street Not Found");
  let user = await userRepo.findOne(input.userId);
  if (!user) return HandelStatus(401);
  let apartment = plainToClass(Apartment, input);
  apartment.province = province;
  apartment.district = district;
  apartment.ward = ward;
  apartment.user = user;
  apartment.type = type;
  apartment.street = street;
  try {
    await apartmentRepo.save(apartment);
    return HandelStatus(200);
  } catch (e) {
    return HandelStatus(500, e);
  }
};
const getAllByUserId = async (userId) => {};
const getAll = async (condition: ConditionApartmentSearch) => {
  let apartmentRepo = getRepository(Apartment);
  let apartmentTypeRepo = getRepository(ApartmentType);
  let provinceRepo = getRepository(Province);
  let districtRepo = getRepository(District);
  let wardRepo = getRepository(Ward);
  let userRepo = getRepository(User);
  let streetRepo = getRepository(Street);
  let province = await provinceRepo.findOne({
    id: condition.districtId || -1,
  });

  let district = await districtRepo.findOne({
    id: condition.districtId || -1,
  });

  let type = await apartmentTypeRepo.findOne({
    id: condition.apartmentTypeId || -1,
  });

  let ward = await wardRepo.findOne({
    id: condition.wardId || -1,
  });

  let street = await streetRepo.findOne({
    id: condition.streetId || -1,
  });
  console.log(street);

  let apartment = await apartmentRepo.find({
    relations: ["province", "district", "street", "ward", "type"],
    where: {
      isApprove: true,
      province: province || Not(isNull(province)),
      district: district || Not(isNull(district)),
      ward: ward || Not(isNull(ward)),
      street: street || Not(isNull(street)),
      type: type || Not(isNull(type)),
    },
    order: {
      create_at: "ASC",
    },
    take: 10,
    skip: 0,
  });
  let result = deserialize(ApartmentGetDto, JSON.stringify(apartment), {
    excludeExtraneousValues: true,
  });
  return HandelStatus(200, null, result);
};

const update = async (input: ApartmentInputDto) => {};
const remove = async (id: number) => {};
const getById = async (id: number) => {};
export const ApartmentService = {
  create,
  getAll,
  update,
  remove,
  getById,
  getAllByUserId,
};