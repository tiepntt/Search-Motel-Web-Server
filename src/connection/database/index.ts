import { plainToClass } from "class-transformer";
import "reflect-metadata";
import { createConnection, getRepository } from "typeorm";
import { UserInputDto } from "../../dto/User/user.dto";
import { ApartmentType } from "../../entity/apartment/apartmentType";
import { KitchenType } from "../../entity/apartment/type/kitchenType";
import { ToiletType } from "../../entity/apartment/type/toiletType";
import { Role } from "../../entity/user/Role";
import { User } from "../../entity/user/User";
import { UserService } from "../../models/User/user.model";
import { mapObject } from "../../utils/map";
import { staticData } from "./staticdata";

export const connectDatabase = (configDb) =>
  createConnection(configDb)
    .then(async (connection) => {
      let roleRepo = getRepository(Role);
      staticData.role.forEach(async (item) => {
        let role = plainToClass(Role, item);
        let roleGet = await roleRepo.findOne({ code: item.code });
        if (roleGet) {
          roleGet = mapObject(roleGet, role);
          await roleRepo.update(roleGet.id, roleGet);
        } else await roleRepo.save(role);
      });
      staticData.apartmentTypes.forEach(async (item) => {
        let typeRepo = getRepository(ApartmentType);

        let typeGet = await typeRepo.findOne({ code: item.code });
        if (!typeGet) {
          let type = new ApartmentType();
          type.name = item.name;
          type.code = item.code;
          try {
            await typeRepo.save(type);
          } catch (e) {}
        }
      });
      staticData.kitchenType.forEach(async (item) => {
        let typeRepo = getRepository(KitchenType);

        let typeGet = await typeRepo.findOne({ code: item.code });
        if (!typeGet) {
          let type = new KitchenType();
          type.name = item.name;
          type.code = item.code;
          try {
            await typeRepo.save(type);
          } catch (e) {}
        }
      });
      staticData.toiletType.forEach(async (item) => {
        let typeRepo = getRepository(ToiletType);

        let typeGet = await typeRepo.findOne({ code: item.code });
        if (!typeGet) {
          let type = new ToiletType();
          type.name = item.name;
          type.code = item.code;
          try {
            await typeRepo.save(type);
          } catch (e) {}
        }
      });
      staticData.user.forEach(async (item) => {
        let user = plainToClass(UserInputDto, item);
        let userRepo = getRepository(User);
        let userGet = await userRepo.find({ email: user.email });
        try {
          await UserService.create(user);
        } catch (e) {
          console.log(e.name);
        }
      });
      console.log("Connected Database");
    })
    .catch((error) => console.log(error));
