import "reflect-metadata";
import { createConnection, getRepository } from "typeorm";
import { Role } from "../../entity/user/Role";
import { staticData } from "./staticdata";

export const connectDatabase = (configDb) =>
  createConnection(configDb)
    .then(async (connection) => {
      let roleRepo = getRepository(Role);
      staticData.role.forEach(async (item) => {
        let role = new Role();
        role.code = item.code;
        role.name = item.name;
        role.isApproveApartment = item.isApproveApartment;
        role.isApproveUser = item.isApproveUser;
        role.isApproveComment = item.isApproveComment;
        role.isManager = item.isManager;
        let roleGet = await roleRepo.findOne({ code: item.code });
        if (roleGet) {
          await roleRepo.update(roleGet.id, role);
        } else await roleRepo.save(role);
      });
      console.log("Connected Database");
    })
    .catch((error) => console.log(error));
