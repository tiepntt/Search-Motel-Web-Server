import { getRepository } from "typeorm";
import { HandelStatus } from "../../config/HandelStatus";
import { DistrictInputDto } from "../../dto/Adress/district.dto";
import { LocationCreateDto } from "../../dto/Adress/location.dto";
import { ProvinceInputDto } from "../../dto/Adress/province.dto";
import { StreetInputDto } from "../../dto/Adress/street.dto";
import { WardInputDto } from "../../dto/Adress/ward.dto";
import { DistrictService } from "../../models/Address/district.model";
import { LocationService } from "../../models/Address/location.model";
import { ProvinceService } from "../../models/Address/province.model";
import { StreetService } from "../../models/Address/street.model";
import { WardService } from "../../models/Address/ward.model";
import { getData } from "../../services/google-api/gapi-spriteSheet";

export const addProvinceBySheet = async (idSheet) => {
  var provinceData = await getData(idSheet, "A2:Z1000000");
  let res = { success: 0, fail: 0 };

  for (let data of provinceData) {
    let provinceInput = new ProvinceInputDto();
    provinceInput.code = data[0];
    provinceInput.name = data[1];
    let result = await ProvinceService.create(provinceInput);
    if (result.status == 200) {
      res.success += 1;
    } else {
      res.fail += 1;
    }
  }
  return HandelStatus(200, null, res);
};
export const addDistrictBySheet = async (idSheet) => {
  var districtData = await getData(idSheet, "A2:Z1000000");
  let res = { success: 0, fail: 0 };
  for (let data of districtData) {
    let district = new DistrictInputDto();
    district.code = data[0];
    district.name = data[1];
    district.provinceCode = data[2];
    let result = await DistrictService.create(district);
    if (result.status == 200) {
      res.success += 1;
    } else {
      res.fail += 1;
    }
  }
  return HandelStatus(200, null, res);
};
export const addWardBySheet = async (idSheet) => {
  var wardData = await getData(idSheet, "A2:Z1000000");
  let res = { success: 0, fail: 0 };
  for (let data of wardData) {
    let ward = new WardInputDto();
    ward.code = data[0];
    ward.name = data[1];
    ward.districtCode = data[2];
    let result = await WardService.create(ward);
    if (result.status == 200) {
      res.success += 1;
    } else {
      res.fail += 1;
    }
  }
  return HandelStatus(200, null, res);
};
export const addStreetBySheet = async (idSheet) => {
  var streetData = await getData(idSheet, "A2:Z1000000");
  let res = { success: 0, fail: 0 };
  for (let data of streetData) {
    let street = new StreetInputDto();
    street.code = data[0];
    street.name = data[1];
    street.districtCode = data[2];
    let result = await StreetService.create(street);
    if (result.status == 200) {
      res.success += 1;
    } else {
      res.fail += 1;
    }
  }
  return HandelStatus(200, null, res);
};
export const addLocationBySheet = async (idSheet) => {
  var locationData = await getData(idSheet, "A2:Z1000000");

  let res = { success: 0, fail: 0 };
  for (let data of locationData) {
    let location = new LocationCreateDto();
    location.name = data[0];
    location.districtCode = data[1];
    location.provinceCode = data[2];
    let result = await LocationService.create(location);
    if (result.status == 200) {
      res.success += 1;
    } else {
      res.fail += 1;
    }
  }
  return HandelStatus(200, null, res);
};
