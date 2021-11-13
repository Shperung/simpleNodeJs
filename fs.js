const fs = require("fs");

fs.readFile("./files/test.txt", "utf-8", (error, data) => {
  fs.mkdirSync("./files-temp", () => {});

  fs.writeFileSync("./files-temp/test2.txt", `${data}New text!`, (error) => {
    error ? console.log(error) : null;
  });
});

setTimeout(() => {
  if (fs.existsSync("./files-temp/test2.txt")) {
    fs.unlink("./files-temp/test2.txt", () => {});
  }
}, 4000);
setTimeout(() => {
  if (fs.existsSync("./files-temp")) {
    fs.rmdir("./files-temp", () => {});
  }
}, 6000);
