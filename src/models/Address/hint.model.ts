import { plainToClass } from "class-transformer";
import { getRepository, Like } from "typeorm";
import { HandelStatus } from "../../config/HandelStatus";
import { HintDto } from "../../dto/Adress/hint.dto";

import { Hint } from "../../entity/address/Hint";
import initAddressRouter from "../../routers/InitData/init-address.router";

const getByKey = async (key: string, take: number) => {
  let hintRepo = getRepository(Hint);
  try {
    let hints = await hintRepo.find({
      where: {
        name: Like(`%${key}%`),
      },
      take: take || 5,
    });
    let result = plainToClass(HintDto, hints, {
      excludeExtraneousValues: true,
    });

    return HandelStatus(200, null, result);
  } catch (e) {
    return HandelStatus(500, e.name);
  }
};
const add = async (input: HintDto) => {
  let hint = plainToClass(Hint, input);
  try {
    await getRepository(Hint).save(hint);
  } catch (e) {
    console.log(e);
  }
};
export const HintService = {
  getByKey,
  add,
};
