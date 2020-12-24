import { plainToClass } from "class-transformer";
import { PriceDto } from "../../dto/Payment/price.dto";
import { PriceService } from "../../models/Payment/price.model";

const create = async (req, res) => {
  let body = req.body;
  let input = plainToClass(PriceDto, body, { excludeExtraneousValues: true });
  let result = await PriceService.create(input);
  return res.send(result);
};
const getAll = async (req, res) => {
  let result = await PriceService.getAll();
  return res.send(result);
};
export const PriceController = { getAll, create };
