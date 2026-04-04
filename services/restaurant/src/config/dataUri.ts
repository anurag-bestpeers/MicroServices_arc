import DataUriParser from "datauri/parser";
import path from "path";

const getBuffer = (file: any) => {
  const parser = new DataUriParser();
  const extensionName = path.extname(file.originalname).toString();
  return parser.format(extensionName, file.buffer);
};

export default getBuffer;
