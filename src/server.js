import express from "express";
import productRouter from "./routes/productRouter.js";
import cartsRouter from "./routes/cartsRouter.js"
import { __dirname } from "./utils.js";

const app = express();

app.use(express.static(__dirname + 'public'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productRouter)

app.use ('/api/carts', cartsRouter)

app.listen(8080, () => {
  console.log("server ok on port 8080");
});
