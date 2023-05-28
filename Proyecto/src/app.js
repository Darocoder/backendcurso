import express from "express";
import ProductManager from "../product_manager.js"

const app = express();
const PORT = 8080;


app.get('/', (req, res) => {
    res.send('Esta es la hompage!')
})

app.get('/api/products', (req, res) => {
    const productsManager = new ProductManager();
    const products = productsManager.getProducts();
    const productSlice = products.slice(0, req.query.limit);
    res.send(JSON.stringify(productSlice));
})

app.get("/api/products/:id", (req, res) => {
    const instancia = new ProductManager();
    instancia.getProducts();
    console.log(instancia.products);
    const id = parseInt(req.params.id); //convierto el id a número
    if (isNaN(id)) { //si el id no es un número devuelvo el error 400
        res.status(400).send("El id debe ser un número.");
        return;
    }
    const product = instancia.getProductByID(req.params.id);
    console.log("este es el product", product, req.params)
    res.send(JSON.stringify(product));
});

app.listen(PORT, () => {
    console.log(`servidor en el puerto ${PORT}`)
});

