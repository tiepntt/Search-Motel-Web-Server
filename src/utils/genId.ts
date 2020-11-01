var uniqId = require("uniqid");
export const generateId = (str) => {
  return uniqId(str || "file-");
};
