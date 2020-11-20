import { deserialize } from "class-transformer";
import { getRepository } from "typeorm";
import { HandelStatus } from "../../config/HandelStatus";
import { TokenDto, TokenInputDto } from "../../dto/author/token.dto";
import { Token } from "../../entity/authenticate/token";
import { Role } from "../../entity/user/Role";
import { User } from "../../entity/user/User";

const create = async (input: TokenInputDto) => {
  let token = new Token();
  token.user = await getRepository(User).findOne(input.userId);
  token.role = await getRepository(Role).findOne(input.roleId);
  try {
    await getRepository(Token).save(token);
    return deserialize(TokenDto, JSON.stringify(token), {
      excludeExtraneousValues: true,
    });
  } catch (e) {
    return null;
  }
};
const reFreshToken = (id: number) => {};
const remove = async (id: number) => {
  try {
    await getRepository(Token).delete(id || -1);
    return HandelStatus(200);
  } catch (e) {
    return HandelStatus(500, e);
  }
};
const getById = async (id: number) => {
  let token = await getRepository(Token).findOne({
    relations: ["user", "role"],
    where: { id: id },
  });
  try {
    return deserialize(TokenDto, JSON.stringify(token), {
      excludeExtraneousValues: true,
    });
  } catch (e) {
    return;
  }
};
export const TokenService = { create, getById, remove };
