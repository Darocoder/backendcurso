import { Router } from "express";
import { ProductManager } from "../src/ProductManager.js";
import { socketServer } from "../src/app.js";

const router = Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));


router.get('/', (req, res) => {
    res.send('Esta es la hompage!')
})

router.get('/api/products', (req, res) => {
    const productsManager = new ProductManager();
    const products = productsManager.getProducts();
    const productSlice = products.slice(0, req.query.limit);
    res.send(JSON.stringify(productSlice));
})

router.get("/api/products/:pid", (req, res) => {
    const manejadorDeProductos = new ProductManager();
    manejadorDeProductos.getProducts();
    console.log(manejadorDeProductos.products);
    const pid = parseInt(req.params.pid); //convierto el id a número
    if (isNaN(pid)) { //si el id no es un número devuelvo el error 400
        res.status(400).send("El id debe ser un número.");
        return;
    }
    const product = manejadorDeProductos.getProductByID(req.params.pid);
    if(!product) {
        res.status(400).send("Producto no encontrado");
        return;
    }
    res.send(JSON.stringify(product));
});

router.post("/api/product", (req, res) => {

    try {
        const newProduct = new Product(req.body);
        const manejadorDeProductos = new ProductManager();
        manejadorDeProductos.getProducts(); //traigo los productos del archivo productos.json
        if(manejadorDeProductos.addProduct(newProduct))
            res.status(201).send("Producto agregado")
        else
            res.status(400).send("El Code ya existe")
    }catch (error) {    
        res.status(400).send("Error al crear el producto");
    };
});

router.put("/api/product/:pid",(req, res) => {
    const newProduct = new Product(req.body);
    const manejadorDeProductos = new ProductManager();
    manejadorDeProductos.getProducts(); //traigo los productos del archivo productos.json
    if(manejadorDeProductos.updateProduct(req.params.pid, newProduct)) //le paso el pid ingresado en la url y ejecuto el método para actualizar todas las propiedades del producto.
        res.status(200).send("Producto actualizado")
    else
        res.status(404).send("El ID no existe")
});

router.delete("/api/product/:pid",(req, res) => {
    const manejadorDeProductos = new ProductManager();
    manejadorDeProductos.getProducts(); //traigo los productos del archivo productos.json
    if(manejadorDeProductos.deleteProductByID(req.params.pid))
        res.status(200).send("Producto eliminado")
    else
        res.status(404).send("No existe el producto")
});

export default router;