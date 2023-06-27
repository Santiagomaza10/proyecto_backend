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

router.post("/:cid/products/:pid", (req, res) => {
  try {
    const {cid} = req.params;
    const {pid} = req.params;
    /* const prodToCart =  */saveProductToCart(cid, pid)
/*     if (prodToCart) {
        res.json(prodToCart)
    } else {
        res.status(400).json({message: "prod or cart not found"})
    }
 */
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export default router;
