import { connectDatabase } from "./database";
import { configDb } from "./database/config";
export const connection = () => {
  connectDatabase(configDb);
};
