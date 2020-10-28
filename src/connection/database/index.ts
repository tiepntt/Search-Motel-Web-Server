import "reflect-metadata";
import { createConnection } from "typeorm";

export const connectDabase = (configDb) =>
  createConnection(configDb)
    .then(async (connection) => {
      console.log("Connected Database");
    })
    .catch((error) => console.log(error));
