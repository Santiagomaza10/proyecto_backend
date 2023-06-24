import express from "express";
import productRouter from "./routes/productRouter.js";
import cartRouter from "./routes/cartRouter.js"
import { dirname } from 'path';
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url))

const app = express();

app.use(express.static(__dirname + 'public'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/products', productRouter)

app.use ('cart', cartRouter)

app.listen(8080, () => {
  console.log("server ok on port 8080");
});
