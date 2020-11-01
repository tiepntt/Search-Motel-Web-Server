var fs = require("fs");

export const createFolder = () => {
  var dirs = ["./upload", "./public"];

  for (const dir of dirs) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
  }
  console.log("created directories");
};
