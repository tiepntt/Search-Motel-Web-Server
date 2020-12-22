import * as multer from "multer";
var storageAvatar = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/avatar");
  },
  filename: function (req, file, cb) {
    cb(null, "avatar-" + Date.now() + "-" + file.originalname);
  },
});
var storageApartment = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/apartment");
  },
  filename: function (req, file, cb) {
    cb(null, "apartment-" + Date.now() + "." + hash(file.originalname));
  },
});
const hash = (str: string) => {
  return str.split(".").pop();
};
// var upload = multer({ storage: storage });
export const uploadAvatarUser = multer({
  storage: storageAvatar,
});
export const uploadApartment = multer({
  storage: storageApartment,
});
