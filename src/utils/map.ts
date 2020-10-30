import { indexing } from "googleapis/build/src/apis/indexing";

export const mapObject = (obj1, object2) => {
  Object.keys(obj1).forEach((key) => {
    obj1[key] = object2[key] || obj1.key;
  });
  return obj1;
};
