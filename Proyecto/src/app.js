import express from "express";
import { ProductManager, Product } from "../product_manager.js"

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const products = [];

app.post("/api/products", (req, res) => {
    const newProduct = new Product(req.body);
    products.push(newProduct);

    res.status(201).send("Producto agregado");
    console.log(products)
});


app.get('/', (req, res) => {
    res.send('Esta es la hompage!')
})

app.get('/api/products', (req, res) => {
    const productsManager = new ProductManager();
    const products = productsManager.getProducts();
    const productSlice = products.slice(0, req.query.limit);
    res.send(JSON.stringify(productSlice));
})

app.get("/api/products/:pid", (req, res) => {
    const instancia = new ProductManager();
    instancia.getProducts();
    console.log(instancia.products);
    const pid = parseInt(req.params.pid); //convierto el id a número
    if (isNaN(pid)) { //si el id no es un número devuelvo el error 400
        res.status(400).send("El id debe ser un número.");
        return;
    }
    const product = instancia.getProductByID(req.params.pid);
    console.log("este es el product", product, req.params)
    res.send(JSON.stringify(product));
});

app.listen(PORT, () => {
    console.log(`servidor en el puerto ${PORT}`)
});

