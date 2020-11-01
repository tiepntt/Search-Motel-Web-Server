import { ApartmentInputDto } from "../../dto/Apartment/apartment.dto";

const create = async (input: ApartmentInputDto) => {};
const getAllByUserId = async (userId) => {};
const getAll = async (condition) => {};
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
