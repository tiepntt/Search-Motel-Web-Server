import { HandelStatus } from "../../config/HandelStatus";
import { ApartmentImageDto } from "../../dto/Image/apartmentImages.dto";
import { ImageApartmentService } from "../../models/Image/apartmentImage.model";
import { getUrl } from "../../utils/regex";

const createMany = async (req, res, next) => {
  if (!req.files) next();
  let ids = [];
  for (let file of req.files) {
    let result = await ImageApartmentService.create({
      url: getUrl(file.path),
    } as ApartmentImageDto);
    if (result.status === 200) {
      ids.push((result.result as any).id);
    }
  }
  req.body.imagesId = ids;
  next();
};
const add = async (req, res) => {
  if (!req.file) return res.send(HandelStatus(400));

  let result = await ImageApartmentService.create({
    url: getUrl(req.file.path),
    folder: "./" + req.file.path,
  } as ApartmentImageDto);
  return res.send(result);
};
const remove = async (req, res) => {
  let { id } = req.query;
  let result = await ImageApartmentService.remove(id);
  return res.send(result);
};

export const ImageApartmentController = { createMany, add, remove };
