import { plainToClass } from "class-transformer";
import { getRepository } from "typeorm";
import { HandelStatus } from "../../../config/HandelStatus";
import { ToiletTypeDto } from "../../../dto/Apartment/type/toiletType.dto";
import { ToiletType } from "../../../entity/apartment/type/toiletType";

const create = async (input: ToiletTypeDto) => {
  if (!input || !input.name || input.code) return HandelStatus(400);
  let ToiletTypeRepo = getRepository(ToiletType);
  let toiletType = plainToClass(ToiletType, input);
  try {
    await ToiletTypeRepo.save(toiletType);
    return HandelStatus(200);
  } catch (e) {
    return HandelStatus(500, e.name);
  }
};
const update = async (input: ToiletTypeDto) => {};
const getAll = async () => {
  let toiletType = await getRepository(ToiletType).find();
  try {
    let result = plainToClass(ToiletTypeDto, toiletType, {
      excludeExtraneousValues: true,
    });
    return result;
  } catch (e) {
    return HandelStatus(500);
  }
};
const getById = async (id: number) => {};
const remove = async (id: number) => {};
export const ToiletTypeService = { create, update, getAll, getById, remove };
