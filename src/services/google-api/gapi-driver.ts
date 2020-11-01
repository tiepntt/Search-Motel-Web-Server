var { google } = require("googleapis");
import * as multer from "multer";
import * as GoogleDriveStorage from "multer-google-drive";
import { generateId } from "../../utils/genId";
var keys = require("../../libs/certifications/gapi-sheets.json");
export const client = new google.auth.JWT(
  keys.client_email,
  null,
  keys.private_key,
  ["https://www.googleapis.com/auth/drive"]
);
let drive = google.drive({ version: "v3", auth: client });

export const uploadAvatarUser = multer({
  storage: GoogleDriveStorage({
    drive: drive,
    parents: "1Ngmd9sBxQsCVl2obt_nWqI6urDNIk-RU",
    fileName: function (req, file, cb) {
      let filename = `avatar-${file.originalname}`;
      cb(null, filename);
    },
    params: {
      folder: (req, file) => "Upload",
    },
  }),
});
