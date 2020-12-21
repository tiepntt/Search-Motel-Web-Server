import { HandelStatus } from "../../config/HandelStatus";
const fs = require("fs");
const removeFile = async (t: string) => {
  try {
    if (fs.existsSync(t)) {
      await fs.unlinkSync(t);
    }

    //file remove
    return 200;
  } catch (err) {
    console.error(err);
    return 500;
  }
};

export const FileService = { removeFile };
