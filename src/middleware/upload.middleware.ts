const uploadApartmentImg = (req, res, next) => {
  req.folder = "/public/apartment/";
  next();
};
export const uploadMiddleware = { uploadApartmentImg };
