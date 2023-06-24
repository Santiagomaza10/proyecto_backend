import { Router } from "express";
import ProductManager from "../managers/productManager.js";

const productManager = new ProductManager("./products.json");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const { limit } = req.query;
    const products = await productManager.getProducts();
    if (limit) {
      const limitprod = products.slice(0, Number(limit));
      res.status(200).json(limitprod);
    } else {
      res.status(200).json(products);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.get("/:idProduct", async (req, res) => {
  try {
    const { idProduct } = req.params;
    const product = await productManager.getProductById(Number(idProduct));
    if (product) {
      res.json(product);
    } else {
      res.status(400).json({ message: "user not found" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, description, price, thumbnail, code, stock } = req.body;

    const newProduct = await productManager.addProduct({
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    });
    res.json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:idProduct", async (req, res) => {
  try {
    const product = req.body;
    const { idProduct } = req.params;
    const idNumber = Number(idProduct);
    const productExist = await productManager.getProductById(idNumber);

    if (productExist) {
      await productManager.updateProduct(product, idNumber);
      res.json({ message: `Product updated` });
    } else {
      res.status(400).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:idProduct", async (req, res) => {
  try {
    const { idProduct } = req.params;
    const idNumber = Number(idProduct);
    const productExist = await productManager.getProductById(idNumber);
    if (productExist) {
      await productManager.deleteProduct(idNumber);
      res.json({ message: `Product deleted` });
    } else {
      res.status(400).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router