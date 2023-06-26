import fs from "fs";
import { __dirname } from "../utils.js";

const pathFile = __dirname + "/db/carts.json";

export const getAllCarts = async () => {
  try {
    if (fs.existsSync(pathFile)) {
      const carts = await fs.promises.readFile(pathFile, "utf-8");
      const cartsJSON = JSON.parse(carts);
      return console.log(cartsJSON);
    } else {
      return console.log([]);
    }
  } catch (error) {
    console.log(error);
  }
};

getAllCarts()