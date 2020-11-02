import * as multer from "multer";
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
var key = require("../../libs/certifications/cloudinary.json");
cloudinary.config({
  cloud_name: "nguyentiep",
  api_key: key.API_KEY,
  api_secret: key.API_SECRET,
});

const storageUser = new CloudinaryStorage({
  cloudinary: cloudinary,
  allowedFormats: ["jpg", "jpeg", "png", "mp4", "mp3", "PNG"],
  params: {
    folder: (req, file) => "avatarUser",
  },
});
const storageApartment = new CloudinaryStorage({
  cloudinary: cloudinary,
  allowedFormats: ["jpg", "jpeg", "png", "mp4", "mp3"],
  params: {
    folder: (req, file) => "apartment",
  },
});
export const uploadAvatarUser = multer({ storage: storageUser });
export const uploadApartment = multer({ storage: storageApartment });
