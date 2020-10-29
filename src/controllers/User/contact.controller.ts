import { ContactUserService } from "../../models/User/contact.model";
const getAll = async (req, res) => {
  res.send(200);
};
const create = async (req, res) => {
  let input = req.body.contact;
  let result = await ContactUserService.create(input);
  res.send(result);
};
const getByUserId = async (req, res) => {
  let id = req.params.id;

  let result = await ContactUserService.getContactByUserId(id);
  res.send(result);
};
export const ContactController = { create, getByUserId, getAll };
