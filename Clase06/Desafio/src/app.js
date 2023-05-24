import express from "express";
import fs from "fs";
import ProductManager from "../desafio.js"

const app = express();
const PORT = 8080;


app.get('/', (req, res) => {
    res.send('Esta es la hompage!')
})

app.get('/products', (req, res) => {
    const productsManager = new ProductManager();
    const products = productsManager.getProducts();
    const productSlice = products.slice(0, req.query.limit);
    res.send(JSON.stringify(productSlice));
})

app.get("/products/:id", (req, res) => {
    const instancia = new ProductManager();
    instancia.getProducts();
    console.log(instancia.products);
    const product = instancia.getProductByID(req.params.id);
    console.log("este es el product", product, req.params)
    res.send(JSON.stringify(product));
});

app.listen(PORT, () => {
    console.log(`servidor en el puerto ${PORT}`)
});

