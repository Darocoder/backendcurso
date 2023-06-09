import { Router } from "express";
import { CartManager } from "../cart_manager.js";

const router = Router();
const manejadorDeCarritos = new CartManager("carts.json");


router.post("/api/cart/", (req, res) => {
    manejadorDeCarritos.addCart();
    res.status(200).send("Nuevo carrito creado");
});

router.get("/api/cart/:cid", (req, res) => {
    manejadorDeCarritos.getCarts();
    let carrito = manejadorDeCarritos.getCartById(req.params.cid)
    if(carrito)
        res.status(200).send(carrito)
    else
        res.status(400).send("No existe el carrito")
});

router.post("/api/cart/:cid/product/:pid", (req, res) => {
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);
    const cartProd = new CartManager("carts.json");
    cartProd.addProductCart(cartId, productId);
    res.send(cartProd);
});


router.listen(PORT, () => {
    console.log(`servidor en el puerto ${PORT}`)
});

export default router;