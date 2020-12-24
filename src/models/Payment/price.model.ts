import { plainToClass } from "class-transformer";
import { getRepository } from "typeorm";
import { HandelStatus } from "../../config/HandelStatus";
import { PriceDto } from "../../dto/Payment/price.dto";
import { Price } from "../../entity/payment/postprice";

const create = async (input: PriceDto) => {
  if (!input || !input.name || !input.price || !input.code)
    return HandelStatus(400);
  let price = plainToClass(Price, input);

  try {
    await getRepository(Price).save(price);
  } catch (e) {
    return HandelStatus(500, e);
  }
};
const update = (input: PriceDto) => {};
const remove = (id: number) => {};
const getAll = async () => {
  let priceList = await getRepository(Price).find();
  return HandelStatus(200, null, priceList);
};
export const PriceService = { create, update, remove, getAll };
