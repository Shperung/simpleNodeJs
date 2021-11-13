const fs = require("fs");
const zlib = require("zlib");

// highWaterMark - розмір За замовчуванням: 64 * 1024
const readStream = fs.createReadStream("./docs/big-text-20-mb.txt", {
  highWaterMark: 256 * 1024,
});
const writeStream = fs.createWriteStream("./docs/new-text.txt");
// можна зазіпити дані
const zipStream = fs.createWriteStream("./docs/text.zip");
const compressStream = zlib.createGzip();

let count = 0;
readStream.on("data", (chunk) => {
  // дуплексний підхід читаємо з  файла і порціонно чанками записуємо в новий файл
  // console.log("---------");
  // console.log(chunk.toString());
  writeStream.write("\n ---CHUNK START--- \n");
  writeStream.write(chunk);
  writeStream.write("\n ---CHUNK END--- \n");
  count++;
  // при дфолту highWaterMark: 64 * 1024 - count 307
  // при highWaterMark: 128 * 1024 - count 154
  // при highWaterMark: 256 * 1024 - count 77
  console.log("---count---", count);
});

const handleError = () => {
  console.log("Error");
  readStream.destroy();
  // якщо під час запису чанка
  zipStream.end("Finished with error...");
};

readStream
  .on("error", handleError)
  .pipe(compressStream)
  .pipe(zipStream)
  .on("error", handleError);
