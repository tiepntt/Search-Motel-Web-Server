import { plainToClass } from "class-transformer";
import { getRepository, Repository } from "typeorm";
import { HandelStatus } from "../../../config/HandelStatus";
import { KitchenTypeDto } from "../../../dto/Apartment/type/kitchenType.dto";
import { KitchenType } from "../../../entity/apartment/type/kitchenType";

const create = async (input: KitchenTypeDto) => {
  if (!input || !input.name || input.code) return HandelStatus(400);
  let KitchenRepo = getRepository(KitchenType);
  let kitchenType = plainToClass(KitchenType, input);
  try {
    await KitchenRepo.save(kitchenType);
    return HandelStatus(200);
  } catch (e) {
    return HandelStatus(500, e.name);
  }
};
const update = async (input: KitchenTypeDto) => {};
const getAll = async () => {};
const getById = async (id: number) => {};
const remove = async (id: number) => {};
export const KitchenTypeService = { create, update, getAll, getById, remove };
