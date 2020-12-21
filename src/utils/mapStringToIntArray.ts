import { isNumber } from "util";

export const mapStringToArray = (str: string) => {
  if (!str) return [];
  let output = str
    .split(",")
    .filter((i) => i != "]")
    .filter((i) => i != "[");
  let result = [];
  output.forEach((e) => {
    if (parseInt(e)) result.push(parseInt(e));
  });
  return result;
};
