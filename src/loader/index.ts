import { createFolder } from "./mkdir";
import { ConnectSocket } from "./soketio";

export const loader = () => {
  createFolder();
  // ConnectSocket(server);
};
