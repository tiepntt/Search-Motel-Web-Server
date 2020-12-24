import { plainToClass } from "class-transformer";
import { ApartmentDetailInputDto } from "../../dto/Apartment/apartmentDetail.dto";
import { ApartmentDetailService } from "../../models/Apartment/apartmentDetail.mode";

const create = async (req, res) => {
  let body = req.body;

  let details = plainToClass(ApartmentDetailInputDto, body, {
    excludeExtraneousValues: true,
  });

  let result = await ApartmentDetailService.create(details);
  return res.send(result);
};
const getByApartmentId = async (req, res) => {
  let id = req.params.apartmentId;
  let userId = res.locals.userId || -1;

  let result = await ApartmentDetailService.getByApartmentId(id, userId);
  return res.send(result);
};
const remove = async (req, res) => {
  let id = req.params.id;
  let result = await ApartmentDetailService.remove(id);
  return res.send(result);
};
export const ApartmentDetailController = { create, getByApartmentId, remove };
