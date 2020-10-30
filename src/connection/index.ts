import { connectDatabase } from "./database";
import { configDb } from "./database/config";
export const connection = async () => {
  connectDatabase(configDb);
};
