import { plainToClass } from "class-transformer";
import { getRepository } from "typeorm";
import { HandelStatus } from "../../config/HandelStatus";
import { ContactDto } from "../../dto/User/contact.dto";
import { ContactUser } from "../../entity/user/Contact";
import { User } from "../../entity/user/User";
import { mapObject } from "../../utils/map";

const getContactByUserId = async (userId) => {
  if (!userId) return HandelStatus(404);

  let contactRepo = getRepository(ContactUser);
  let userRepo = getRepository(User);
  let user = await userRepo.findOne(userId);
  let contact = await contactRepo.findOne({ user: user });
  let contactResult = plainToClass(ContactDto, contact, {
    excludeExtraneousValues: true,
  });
  contactResult.userId = user.id;
  if (!contact) {
    return HandelStatus(404);
  } else return HandelStatus(200, null, contactResult);
};
const create = async (contactInput: ContactDto) => {
  let contactRepo = getRepository(ContactUser);
  let userRepo = getRepository(User);
  console.log(contactInput.phone, "p");

  if (
    !contactInput ||
    !contactInput.email ||
    !contactInput.phone ||
    !contactInput.userId
  ) {
    console.log(contactInput);

    return HandelStatus(400);
  }

  let user = await userRepo.findOne(contactInput.userId);
  if (!user) {
    return HandelStatus(404, "User không tồn tại!");
  }
  let contact = plainToClass(ContactUser, contactInput);
  let contactGet = await contactRepo.findOne({ user: user });
  if (contactGet) {
    try {
      contactGet.email = contactInput.email || contactGet.email;
      contactGet.phone = contactInput.phone || contactGet.phone;
      contactGet.phone2 = contactInput.phone2 || contactGet.phone2;
      await contactRepo.update(contactGet.id, contactGet);

      return HandelStatus(200);
    } catch (e) {
      return HandelStatus(500, e);
    }
  }

  user.contactUser = contact;
  contact.user = user;
  try {
    await contactRepo.save(contact);
    await userRepo.update(contactInput.userId, user);
  } catch (e) {
    return HandelStatus(500, e.name);
  }
  return HandelStatus(200);
};
const getByid = async (id: number) => {};
const update = async (input: ContactDto) => {
  if (!input || !input.id) return HandelStatus(400);
  if (!input.phone)
    return HandelStatus(400, "Số điện thoại không được bỏ trống");
  if (!input.email) return HandelStatus(400, "Email không được bỏ trống");
  let contactRepo = getRepository(ContactUser);
  let user = await getRepository(User).findOne(input.userId || -1);
  if (!user) return HandelStatus(403);
  let contact = await contactRepo.findOne({ id: input.id, user: user });
  if (!contact) return HandelStatus(403);
  contact = mapObject(contact, input);
  try {
    contactRepo.update(input.id, contact);
    return HandelStatus(200);
  } catch (e) {
    return HandelStatus(500, e);
  }
};
const getUserInfo = () => {
  
}
const remove = async (id: number, userId: number) => {
  if (!id || !userId) return HandelStatus(400);
  let contactRepo = getRepository(ContactUser);
  let user = await getRepository(User).findOne(userId || -1);
  if (!user) return HandelStatus(403);
  let contact = await contactRepo.findOne({ id: id, user: user });
  if (!contact) return HandelStatus(403);
  try {
    await contactRepo.remove(contact);
    return HandelStatus(200);
  } catch (e) {
    return HandelStatus(500, e);
  }
};
export const ContactUserService = {
  getContactByUserId,
  getByid,
  create,
  update,
  remove,
};
