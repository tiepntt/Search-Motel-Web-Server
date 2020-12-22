import { deserialize, deserializeArray, plainToClass } from "class-transformer";
import {
  Between,
  getRepository,
  IsNull,
  LessThan,
  LessThanOrEqual,
  Like,
  Not,
} from "typeorm";
import { isNull } from "util";
import { HandelStatus } from "../../config/HandelStatus";
import {
  ApartmentApproveDto,
  ApartmentDeletedDto,
  ApartmentDto,
  ApartmentGetDto,
  ApartmentInputDto,
} from "../../dto/Apartment/apartment.dto";
import { ConditionApartmentSearch } from "../../dto/Search/condition.dto";
import { District } from "../../entity/address/District";
import { Location } from "../../entity/address/Location";
import { Province } from "../../entity/address/Province";
import { Street } from "../../entity/address/Street";
import { Ward } from "../../entity/address/Ward";
import { Apartment } from "../../entity/apartment/apartment";
import { ApartmentType } from "../../entity/apartment/apartmentType";
import { User } from "../../entity/user/User";
import { mapObject } from "../../utils/map";
import { LocationNearService } from "./apartmentNear.model";

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
  let locationRepo = getRepository(Location);
  let province = await provinceRepo.findOne(input.provinceId);
  let apartment = {} as Apartment;
  let user = await userRepo.findOne(input.userId);
  if (!user) return HandelStatus(401);
  if (input.id) {
    apartment = await apartmentRepo.findOne({
      where: {
        id: input.id,
        user: user,
      },
      relations: ["district", "province", "street", "ward", "user", "type"],
    });

    if (!apartment) {
      return HandelStatus(404);
    }
    apartment = mapObject(apartment, input);
  } else {
    apartment = plainToClass(Apartment, input);
  }
  if (!province) return HandelStatus(404, "Không tìm thấy dũ liệu tỉnh");
  let district = await districtRepo.findOne({
    id: input.districtId,
    province: province,
  });

  let type = await apartmentTypeRepo.findOne(input.type);
  if (!type) return HandelStatus(404, "Apartment Type not Found");
  if (!district) return HandelStatus(404, "Dữ liệu quận/huyện không phù hợp");
  let ward = await wardRepo.findOne({
    where: {
      id: input.wardId,
      district: district,
    },
  });
  if (!ward) return HandelStatus(404, "Dữ liệu phường/xã không phù hợp");
  let street = await streetRepo.findOne({
    id: input.streetId,
    districts: district,
  });
  if (!street) return HandelStatus(404, "Dữ liệu đường/phố không hợp lệ");

  apartment.province = province;
  apartment.district = district;
  apartment.ward = ward;
  apartment.user = user;
  apartment.type = type;
  apartment.street = street;
  apartment.id = input.id;
  apartment.hint =
    street.name +
    "," +
    ward.name +
    "," +
    district.name +
    "," +
    province.name +
    "," +
    street.name +
    "," +
    district.name +
    "," +
    province.name;
  if (input.id) {
    await LocationNearService.createMany(apartment, input.LocationsNearCode);
  }
  try {
    if (input.id) {
      await apartmentRepo.save(apartment);
    } else {
      let result = await apartmentRepo.save(apartment);
      await LocationNearService.createMany(apartment, input.LocationsNearCode);
    }

    return HandelStatus(200, null, { id: apartment.id });
  } catch (e) {
    return HandelStatus(500, e);
  }
};
const getAllByUserId = async (userId: number) => {
  if (!userId) return HandelStatus(400);
  let apartment = await getRepository(Apartment)
    .createQueryBuilder("apartment")
    .where("apartment.userId = :id", { id: userId })
    .getMany();
  if (!apartment) return HandelStatus(200);
  let result = deserializeArray(ApartmentGetDto, JSON.stringify(apartment), {
    excludeExtraneousValues: true,
  });
  return HandelStatus(200, null, result);
};
const getAll = async (condition: ConditionApartmentSearch) => {
  // console.log(condition);

  let apartmentRepo = getRepository(Apartment);
  let apartmentTypeRepo = getRepository(ApartmentType);
  let provinceRepo = getRepository(Province);
  let districtRepo = getRepository(District);
  let wardRepo = getRepository(Ward);
  let userRepo = getRepository(User);
  let streetRepo = getRepository(Street);
  let province = await provinceRepo.findOne({
    id: condition.provinceId || -1,
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
  let conditionLet = {
    // isApprove: true,
    province: province || Not(isNull(province)),
    district: district || Not(isNull(district)),
    ward: ward || Not(isNull(ward)),
    street: street || Not(isNull(street)),
    type: type || Not(isNull(type)),
    price: Between(condition.minPrice, condition.maxPrice),
    area: Between(condition.minS, condition.maxS),
    hint: Like(`%${condition.key || ""}%`),
  };

  let apartment = await apartmentRepo.findAndCount({
    relations: ["province", "district", "street", "ward", "type", "user"],
    where: conditionLet,
    order: {
      create_at: "DESC",
    },
    take: condition.take || 5,
    skip: condition.skip || 0,
  });
  if (!apartment) return HandelStatus(404);
  let result = deserialize(ApartmentDto, JSON.stringify(apartment[0]), {
    excludeExtraneousValues: true,
  });
  return HandelStatus(200, null, { count: apartment[1], data: result });
};

const update = async (input: ApartmentInputDto) => {};
const remove = async (id: number, userId: number) => {
  let apartmentRepo = getRepository(Apartment);
  let apartment = await apartmentRepo.findOne(id);
  let user = await getRepository(User).findOne(userId);
  if (!apartment || !user) return HandelStatus(404);
  try {
    apartment.userDeleted = user;
    apartment.delete_at = new Date();
    await apartmentRepo.update(id, apartment);
    await apartmentRepo.softRemove(apartment);
    return HandelStatus(200);
  } catch (e) {
    return HandelStatus(500, e);
  }
};
const getDeleted = async () => {
  let apartmentRepo = getRepository(Apartment);
  let apartments = await apartmentRepo.find({
    cache: true,
    withDeleted: true,
    relations: ["user", "userDeleted"],
  });
  if (!apartments) return HandelStatus(404);
  let result = deserializeArray(
    ApartmentDeletedDto,
    JSON.stringify(apartments),
    {
      excludeExtraneousValues: true,
    }
  );
  return HandelStatus(200, null, result);
};
const restoreById = async (id: number) => {
  let apartmentRepo = getRepository(Apartment);
  try {
    await apartmentRepo.restore(id || -1);
    return HandelStatus(200);
  } catch (e) {
    return HandelStatus(500, e);
  }
};
const getById = async (id: number, skip = 0, take: 10) => {};
const getNeedApproveByAdminId = async (adminId: number) => {
  let userRepo = getRepository(User);
  let userAdmin = await userRepo.findOne({
    relations: ["userChild"],
    where: {
      id: adminId,
    },
  });

  if (!userAdmin) return HandelStatus(404, "User Not Found");
  let users = userAdmin.userChild;
  let apartments = [];
  for (let i = 0; i < users.length; i++) {
    let apartment = await await getRepository(Apartment).find({
      relations: ["user"],
      where: {
        user: users[i],
        isApprove: false,
      },
    });
    if (apartment) apartments = apartments.concat(apartment);
  }

  try {
    let apartmentList = deserializeArray(
      ApartmentApproveDto,
      JSON.stringify(apartments),
      { excludeExtraneousValues: true }
    );
    return HandelStatus(200, null, apartmentList);
  } catch (e) {
    return HandelStatus(500, e.name);
  }
};
const approveApartment = async (id: number, userApproveId: number) => {
  let apartment = await getRepository(Apartment).findOne({
    id: id,
    userApprove: IsNull(),
  });
  if (!apartment) return HandelStatus(404);
  apartment.userApprove =
    (await getRepository(User).findOne(userApproveId)) || apartment.userApprove;
  apartment.isApprove = true;
  apartment.approve_at = new Date();
  try {
    await getRepository(Apartment).save(apartment);
    return HandelStatus(200);
  } catch (e) {
    return HandelStatus(500, e.name);
  }
};
const getAllByEmploymentId = async (
  employmentId: number,
  take: number,
  skip: number
) => {
  let user = await getRepository(User).findOne(employmentId || -1);
  if (!user) return HandelStatus(401);
  let apartments = await getRepository(Apartment).find({
    relations: ["province", "district", "street", "ward", "type", "user"],
    where: {
      userApprove: user,
    },
    order: {
      approve_at: "DESC",
    },
    withDeleted: true,
    take: take || 10,
    skip: skip || 0,
  });

  if (apartments.length == 0) return HandelStatus(200, null, []);
  try {
    let result = plainToClass(ApartmentGetDto, apartments, {
      excludeExtraneousValues: true,
    });
    return HandelStatus(200, null, result);
  } catch (e) {
    return HandelStatus(500, e);
  }
};
export const ApartmentService = {
  create,
  getAll,
  update,
  remove,
  getById,
  getAllByUserId,
  getDeleted,
  restoreById,
  getNeedApproveByAdminId,
  approveApartment,
  getAllByEmploymentId,
};
