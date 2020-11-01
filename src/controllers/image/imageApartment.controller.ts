import { ApartmentImageDto } from "../../dto/Image/apartmentImages.dto";
import { ImageApartmentService } from "../../models/Image/apartmentImage.model";

const createMany = async (req, res, next) => {
  if (!req.files) next();
  let ids = [];
  for (let file of req.files) {
    let result = await ImageApartmentService.create({
      url: file.path,
    } as ApartmentImageDto);
    if (result.status === 200) {
      ids.push((result.result as any).id);
    }
  }
  req.body.imagesId = ids;
  next();
};

export const ImageApartmentController = { createMany };
