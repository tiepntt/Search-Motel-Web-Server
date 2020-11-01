import { ApartmentInputDto } from "../../dto/Apartment/apartment.dto";
import { ApartmentDetailInputDto } from "../../dto/Apartment/apartmentDetail.dto";

const create = async (input: ApartmentDetailInputDto) => {};
const update = async (input: ApartmentInputDto) => {};
const remove = async (id: number) => {};
export const ApartmentDetailService = { create, update, remove };
