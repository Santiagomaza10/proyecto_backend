import { Router } from "express";
import {
  getAllCarts,
  getCartById,
  saveProductToCart,
  createCart,
} from "../managers/cartsManager.js";

const router = Router();

router.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await getCartById(Number(cid));
    if (cart) {
      res.json(cart);
    } else {
      res.status(400).json({ message: "cart not found" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.post("/:cid/products/:pid", async (req, res) => {
  try {
    const {cid, pid} = req.params;
    const cart = await saveProductToCart(Number(cid),Number(pid))

    res.json(cart)
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});


export default router;


/* import ProductManager from "../managers/productManager.js";

const productManager = new ProductManager("./products.json");
 */
/* router.post("/:cid/products/:pid", async (req, res) => {
  try {
    const {cid, pid} = req.params;
    const products = await productManager.getProducts();

    res.json(products)

  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}); */