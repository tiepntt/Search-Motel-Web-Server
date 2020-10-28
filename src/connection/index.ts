import { connectDabase } from "./database";
import { configDb } from "./database/config";
export const connecttion = () => {
  connectDabase(configDb);
};
