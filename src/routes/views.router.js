import { Router } from "express";
import ProductManager from "../managers/productManager.js";
import { __dirname } from "../utils.js";

const router = Router();

const productManager = new ProductManager(__dirname + "/db/products.json");

router.get("/", async (req, res) => {
  try {
    const products = await productManager.getProducts();

    res.render("home", { products });
  } catch (error) {
    console.log(error);
  }
});

router.get("/realtimeproducts", async (req, res) => {
  try {
    res.render("realTimeProducts");
  } catch (error) {
    console.log(error)
  }
});

export default router;
