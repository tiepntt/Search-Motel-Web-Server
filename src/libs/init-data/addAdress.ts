import { getRepository } from "typeorm";
import { HandelStatus } from "../../config/HandelStatus";
import { Province } from "../../entity/adress/Province";
import { getData } from "../../services/google-api/gpai-spriteSheet";

export const addProvinceBySheet = async (idSheet) => {
  let StudentRepo = getRepository(Province);
  var pronvinceData = await getData(idSheet, "A1:Z1000000");
  await pronvinceData.forEach((data) => {});

  //   return HandelStatus(200, null, { data: data });
};
