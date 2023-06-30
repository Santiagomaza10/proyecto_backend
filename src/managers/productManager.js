import fs from "fs";
import { __dirname } from "../utils.js";

const pathFile = __dirname + "/db/products.json";

export default class ProductManager {
  constructor(path) {
    this.path = path;
  }

  #productValidation(prod) {
    if (
      !!prod.title &&
      !!prod.description &&
      !!prod.price &&
      !!prod.code &&
      !!prod.thumbnail &&
      !!prod.stock &&
      !!prod.status
    ) {
      return true;
    }
  }

  async #getMaxId() {
    let maxId = 0;
    const products = await this.getProducts();
    products.map((product) => {
      if (product.id > maxId) maxId = product.id;
    });
    return maxId;
  }

  async addProduct(prod) {
    if (this.#productValidation(prod)) {
      const productsFile = await this.getProducts();

      if (
        !productsFile.some(
          (p) => p.code === prod.code || productsFile.length == 0
        )
      ) {
        try {
          const product = {
            id: (await this.#getMaxId()) + 1,
            ...prod,
          };
          productsFile.push(product);
          await fs.promises.writeFile(this.path, JSON.stringify(productsFile));

          return "producto agregado";
        } catch (error) {
          console.log(error);
        }
      } else {
        return console.log("El producto ya existe");
      }
    } else {
      return "Todos los campos son obligatorios";
    }
  }

  async getProducts() {
    try {
      if (fs.existsSync(this.path)) {
        const products = await fs.promises.readFile(this.path, "utf-8");
        const productsJS = JSON.parse(products);
        console.log(productsJS)
        return productsJS;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getProductById(id) {
    try {
      const productsFile = await this.getProducts();
      const search = productsFile.find((prod) => prod.id === id);
      return search;
    } catch (error) {
      console.log(error);
    }
  }

  async updateProduct(nwproduct, prodid) {
    const productsFile = await this.getProducts();
    const index = productsFile.findIndex((product) => product.id === prodid);

    try {
      if (index >= 0) {
        productsFile[index] = { ...productsFile[index], ...nwproduct };
        console.log(productsFile[index]);
        await fs.promises.writeFile(this.path, JSON.stringify(productsFile));
      }

    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(id) {
    try {
      const productsFile = await this.getProducts();
      const newArray = productsFile.filter((prod) => prod.id !== id);
      await fs.promises.writeFile(this.path, JSON.stringify(newArray));
      return console.log(newArray);
    } catch (error) {
      console.log(error);
    }
  }
}

const manager = new ProductManager(pathFile);