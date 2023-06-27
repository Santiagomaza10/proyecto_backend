import fs from "fs";
import { __dirname } from "../utils.js";

const pathFile = __dirname + "/db/carts.json";

export const getAllCarts = async () => {
  try {
    if (fs.existsSync(pathFile)) {
      const carts = await fs.promises.readFile(pathFile, "utf-8");
      const cartsJSON = JSON.parse(carts);
      return cartsJSON;
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
  }
};

export const getMaxId = async () => {
  let maxId = 0;
  const carts = await getAllCarts();
  carts.map((cart) => {
    if (cart.id > maxId) maxId = cart.id;
  });
  return maxId;
};

export const createCart = async () => {
  try {
    const cart = {
      id: (await getMaxId()) + 1,
      products: [],
    };
    const cartsFile = await getAllCarts();
    cartsFile.push(cart);
    await fs.promises.writeFile(pathFile, JSON.stringify(cartsFile));

    return console.log("el carrito", cart);
  } catch (error) {
    console.log(error);
  }
};

export const getCartById = async (id) => {
  try {
    const cartsFile = await getAllCarts();
    const search = cartsFile.find((cart) => cart.id === id);

    if (search) {
      return search;
    } else {
      return "El carrito no existe";
    }
  } catch (error) {
    console.log(error);
  }
};

export const saveProductToCart = async (cartId, prodId) => {
  const cartsFile = await getAllCarts();
  const cart = cartsFile.find((cart) => cart.id === cartId);

  const productsJSON = await fs.promises.readFile(
    "../../products.json",
    "utf-8"
  );
  const productsJs = JSON.parse(productsJSON);
  const prodExist = productsJs.find((prod) => prod.id === prodId);

  if (prodExist) {
    const prodInCart = cart.products.find((prod) => prod.id === prodId);

    if (prodInCart) {
      prodInCart.quantity += 1;
    } else {
      const prod = {
        id: prodId,
        quantity: 1,
      };
      cart.products.push(prod);
    }
    await fs.promises.writeFile(pathFile, JSON.stringify(cartsFile));
    return cart;
  } else {
    return console.log("el producto ingresado no existe");
  }
};
