import { deserialize, deserializeArray, plainToClass } from "class-transformer";
import {
  Between,
  getRepository,
  In,
  IsNull,
  LessThan,
  LessThanOrEqual,
  Like,
  MoreThan,
  Not,
} from "typeorm";
import { isNull } from "util";
import { HandelStatus } from "../../config/HandelStatus";
import { ApartmentReviewController } from "../../controllers/Apartment/apartmentReivew.controller";
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
import { Price } from "../../entity/payment/postprice";
import { Role } from "../../entity/user/Role";
import { User } from "../../entity/user/User";
import { ApartmentReviewHelper } from "../../helper/apartment.review.helper";
import { ApartmentReportHelper } from "../../helper/apartmentReport.helper";
import { addDate } from "../../utils/dateTime";
import { mapObject } from "../../utils/map";
import { NotificationApartmentService } from "../Notification/notification.apartment.model";
import { LocationNearService } from "./apartmentNear.model";

const create = async (input: ApartmentInputDto) => {
  if (
    !input ||
    !input.provinceId ||
    !input.districtId ||
    !input.title ||
    !input.price ||
    !input.pricePostId
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
  let pricePost = await getRepository(Price).findOne({
    id: input.pricePostId,
  });
  if (!pricePost) return HandelStatus(404, "Không tìm thấy gói đăng tin");
  apartment.province = province;
  apartment.district = district;
  apartment.ward = ward;
  apartment.user = user;
  apartment.type = type;
  apartment.street = street;
  apartment.id = input.id;
  apartment.pricePost = pricePost;
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
      let roles = await getRepository(Role).find({
        where: [{ code: "A" }, { code: "MNG" }],
      });

      let userSubscribe = await getRepository(User).find({
        relations: ["role"],
        where: [
          {
            role: roles[0],
          },
          { role: roles[1] },
        ],
      });

      await NotificationApartmentService.create({
        context: user.name + " đã thêm một bài đăng.",
        apartment: apartment,
        userCreate: user,
        userSubscribe: userSubscribe,
      });
      await LocationNearService.createMany(apartment, input.LocationsNearCode);
    }

    return HandelStatus(200, null, { id: apartment.id });
  } catch (e) {
    return HandelStatus(500);
  }
};
const getAllByUserId = async (userId: number, take?: number, skip?: number) => {
  if (!userId) return HandelStatus(400);
  let user = await getRepository(User).findOne({ id: userId });
  let takeOffset = parseInt(take.toString());
  let skipOffset = parseInt(skip.toString());
  if (!user) return HandelStatus(404);
  try {
    let apartment = await getRepository(Apartment).findAndCount({
      relations: ["district", "province", "street", "ward", "user", "type"],
      where: {
        user: user,
        isApprove: true,
      },
      take: takeOffset || 5,
      skip: skipOffset || 0,
    });
    if (!apartment) return HandelStatus(200);
    let result = plainToClass(ApartmentGetDto, apartment[0], {
      excludeExtraneousValues: true,
    });
    return HandelStatus(200, null, { count: apartment[1], data: result });
  } catch (e) {
    return HandelStatus(500);
  }
};
const getAll = async (condition: ConditionApartmentSearch) => {
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
  let convert = {
    ...condition,
    minPrice: parseInt(condition.minPrice.toString() || "0"),
    maxPrice: parseInt(condition.maxPrice.toString() || "10000000"),
    minS: parseInt(condition.minS.toString() || "0"),
    maxS: parseInt(condition.maxS.toString() || "100000000"),
  };
  let conditionLet = {
    isApprove: true,
    province: province || Not(isNull(province)),
    district: district || Not(isNull(district)),
    ward: ward || Not(isNull(ward)),
    street: street || Not(isNull(street)),
    type: type || Not(isNull(type)),
    price: Between(convert.minPrice, convert.maxPrice),
    area: Between(convert.minS, convert.maxS),
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
    relations: ["pricePost", "user"],
    where: {
      id: id,
      isApprove: false,
    },
  });
  if (!apartment) return HandelStatus(404);
  let user =
    (await getRepository(User).findOne(userApproveId)) || apartment.userApprove;
  apartment.userApprove = user;

  apartment.isApprove = true;
  apartment.deadline = addDate(new Date(), apartment.pricePost.time || 0);
  apartment.approve_at = new Date();
  try {
    await getRepository(Apartment).save(apartment);
    await NotificationApartmentService.create({
      context: "Một bài đăng đã của bạn đã được duyệt",
      apartment: apartment,
      userCreate: user,
      userSubscribe: [apartment.user],
    });
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
const getAllApartment = async (
  take: number,
  skip: number,
  isApprove: boolean,
  key: string
) => {
  let apartmentRepo = getRepository(Apartment);
  let approve = isApprove && isApprove.toString() === "true";
  let apartments = await apartmentRepo.findAndCount({
    relations: [
      "street",
      "ward",
      "district",
      "province",
      "user",
      "type",
      "userApprove",
      "pricePost",
    ],
    where: {
      isApprove: approve || false,
      hint: Like(`%${key || ""}%`),
    },
    take: take || 5,
    skip: skip || 0,
  });

  try {
    let apartmentsGet = { ...apartments }[0];
    let dtos = plainToClass(ApartmentDto, apartmentsGet, {
      excludeExtraneousValues: true,
    });

    for (let i = 0; i < apartments[0].length; i++) {
      dtos[i].reportCount = await ApartmentReportHelper.getCountByApartment(
        apartments[0][i]
      );
      dtos[i].reviewCount = await ApartmentReviewHelper.getCountByApartment(
        apartments[0][i]
      );
    }
    return HandelStatus(200, null, { data: dtos, count: apartments[1] });
  } catch (e) {
    return HandelStatus(500, e);
  }
};
const getAllApartmentByUser = async (
  userId,
  take: number,
  skip: number,
  isApprove: boolean,
  key: string
) => {
  let user = await getRepository(User).findOne({ id: userId });
  console.log(user);

  if (!user) return HandelStatus(404, "Không tìm thấy người dùng");
  let apartmentRepo = getRepository(Apartment);
  let approve = isApprove.toString() === "true";
  let apartments = await apartmentRepo.findAndCount({
    relations: [
      "street",
      "ward",
      "district",
      "province",
      "user",
      "type",
      "userApprove",
      "pricePost",
    ],
    where: {
      user: user,
      isApprove: approve || false,
      hint: Like(`%${key || ""}%`),
    },
    take: take || 5,
    skip: skip || 0,
  });

  try {
    let apartmentsGet = { ...apartments }[0];
    let dtos = plainToClass(ApartmentDto, apartmentsGet, {
      excludeExtraneousValues: true,
    });

    for (let i = 0; i < apartments[0].length; i++) {
      dtos[i].reportCount = await ApartmentReportHelper.getCountByApartment(
        apartments[0][i]
      );
      dtos[i].reviewCount = await ApartmentReviewHelper.getCountByApartment(
        apartments[0][i]
      );
    }
    return HandelStatus(200, null, { data: dtos, count: apartments[1] });
  } catch (e) {
    return HandelStatus(500, e);
  }
};
const getALlApproveByEmployment = async () => {};
const changeStatus = async (userId: number, apartmentId: number) => {
  if (!userId || !apartmentId) return HandelStatus(400);
  let user = await getRepository(User).findOne(userId);
  let apartmentRepo = getRepository(Apartment);
  if (!user) return HandelStatus(404, "Bạn không phải chủ nhà");
  let apartment = await apartmentRepo.findOne({ user: user, id: apartmentId });
  if (!apartment) return HandelStatus(404);
  apartment.status = !apartment.status;
  try {
    await apartmentRepo.save(apartment);
    return HandelStatus(200);
  } catch (e) {
    return HandelStatus(500);
  }
};
const extendApartment = async (
  userId: number,
  apartmentId: number,
  postPriceId: number
) => {
  if (!userId || !apartmentId || !postPriceId) return HandelStatus(400);
  if (!userId || !apartmentId) return HandelStatus(400);
  let user = await getRepository(User).findOne(userId);
  let apartmentRepo = getRepository(Apartment);
  if (!user) return HandelStatus(404, "Bạn không phải chủ nhà");
  let apartment = await apartmentRepo.findOne({ user: user, id: apartmentId });
  let postPrice = await getRepository(Price).findOne(postPriceId);
  if (!postPrice) return HandelStatus(404, "Không tìm thấy gói thời gian");
  if (!apartment) return HandelStatus(404);

  apartment.pricePost = postPrice;
  apartment.deadline = null;
  apartment.isApprove = false;
  apartment.status == false;
  try {
    await apartmentRepo.save(apartment);
    return HandelStatus(200);
  } catch (e) {
    return HandelStatus(500);
  }
};
const getMaxViews = async (take: number) => {
  let apartmentRepo = getRepository(Apartment);
  let result = await apartmentRepo.find({
    relations: [
      "street",
      "ward",
      "district",
      "province",
      "user",
      "type",
      "userApprove",
      "pricePost",
    ],
    where: {},
    take: take || 5,
    order: {
      views: "DESC",
    },
  });
  try {
    let res = plainToClass(ApartmentDto, result, {
      excludeExtraneousValues: true,
    });
    return HandelStatus(200, null, res);
  } catch (e) {
    return HandelStatus(500);
  }
};
const getApartmentListCount = async () => {
  let districts = await getRepository(District).find();
  try {
    let apartments = [];
    for (let district of districts) {
      let apartmentCount = await getRepository(Apartment).count({
        relations: ["district"],
        where: {
          district: districts,
        },
      });
      apartments.push({
        id: district.id,
        name: district.name,
        count: apartmentCount,
      });
    }
    return HandelStatus(200, null, apartments);
  } catch (e) {
    return HandelStatus(500);
  }
};
const getApartmentListCountByType = async () => {
  let districts = await getRepository(ApartmentType).find();
  try {
    let apartments = [];
    for (let district of districts) {
      let apartmentCount = await getRepository(Apartment).count({
        relations: ["district"],
        where: {
          type: districts,
        },
      });
      apartments.push({
        id: district.id,
        name: district.name,
        count: apartmentCount,
      });
    }
    return HandelStatus(200, null, apartments);
  } catch (e) {
    return HandelStatus(500);
  }
};
const getNew = async () => {
  let date = addDate(new Date(), -30);
  let news = await getRepository(Apartment).count({
    where: {
      isApprove: true,
      create_at: MoreThan(date),
    },
  });
  return news;
};
const getDeadline = async () => {
  let news = await getRepository(Apartment).count({
    where: {
      isApprove: true,
      deadline: LessThan(new Date()),
    },
  });
  return news;
};

export const ApartmentService = {
  getDeadline,
  getNew,
  getApartmentListCountByType,
  getApartmentListCount,
  create,
  getAll,
  update,
  extendApartment,
  remove,
  getById,
  getAllByUserId,
  getAllApartment,
  getALlApproveByEmployment,
  getAllApartmentByUser,
  getDeleted,
  restoreById,
  getNeedApproveByAdminId,
  approveApartment,
  getAllByEmploymentId,
  changeStatus,
  getMaxViews,
};
