import express from "express";
import { ProductManager, Product } from "../product_manager.js"

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


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

app.post("/api/product", (req, res) => {

    try {
        const newProduct = new Product(req.body);
        const pm = new ProductManager();
        pm.getProducts(); //traigo los productos del archivo productos.json
        pm.addProduct(newProduct);
        res.status(201).send("Producto agregado");
    }catch (error) {    
        console.log(error)
    };
});

app.put("/api/product/:pid",(req, res) => {
    const newProduct = new Product(req.body);
    const pm = new ProductManager();
    pm.getProducts(); //traigo los productos del archivo productos.json
    pm.updateProduct(req.params.pid, newProduct); //le paso el pid ingresado en la url y ejecuto el método para actualizar todas las propiedades del producto.
    res.status(200).send("Producto actualizado");
    
});

app.delete("/api/product/:pid",(req, res) => {
    const pm = new ProductManager();
    pm.getProducts(); //traigo los productos del archivo productos.json
    pm.deleteProductByID(req.params.pid);
    console.log(pm);

    res.status(200).send("Producto eliminado")
});

app.listen(PORT, () => {
    console.log(`servidor en el puerto ${PORT}`)
});

