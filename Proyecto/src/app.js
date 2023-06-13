import express from "express";
import productRouter from "../src/routes/products-route.js"
import cartsRouter from "../src/routes/carts-route.js"

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productRouter);
app.use("/api/cart", cartsRouter);

app.listen(PORT, () => {
    console.log(`servidor en el puerto ${PORT}`)
});