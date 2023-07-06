import express from "express";
import { __dirname } from "./utils.js";
import handlebars from "express-handlebars";
import productRouter from "./routes/productRouter.js";
import cartsRouter from "./routes/cartsRouter.js";
import viewsRouter from "./routes/views.router.js";
import { Server } from "socket.io";
import ProductManager from "./managers/productManager.js";
const productManager = new ProductManager(__dirname + "/db/products.json");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use("/", viewsRouter);
app.use("/realtimeproducts", viewsRouter);

app.use("/api/products", productRouter);

app.use("/api/carts", cartsRouter);

const httpServer = app.listen(8080, () => {
  console.log("Server ok on port 8080");
});

const socketServer = new Server(httpServer);

socketServer.on("connection", async (socket) => {
  console.log(`Usuario conectado: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`Usuario desconectado`);
  });

  socket.emit("arrayproducts", await productManager.getProducts())

  socket.on('newProduct', async (obj) => {
      await productManager.addProduct(obj);
      socketServer.emit('arrayProducts', await productManager.getProducts());
  })
});
