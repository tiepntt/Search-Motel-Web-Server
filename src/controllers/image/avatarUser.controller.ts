import { request } from "https";
import { AvatarUserDto } from "../../dto/Image/avatarUser.dto";
import { AvatarUserService } from "../../models/Image/avatarUser.model";

const create = async (req, res, next) => {
  let input = new AvatarUserDto();
  input.url = req.file.path || null;
  let result = await AvatarUserService.create(input);
  let id = (result.result as any).id;

  if (result.status == 200) {
    req.body.imgId = id;
    next();
  } else {
    return res.send(result);
  }
};
export const AvatarUserController = { create };
