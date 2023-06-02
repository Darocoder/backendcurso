import fs from "fs";
export class CartManager {

    constructor(path){
        this.carts= [];
        this.id = 1;
        this.path = path
    }

    createCart(products = []) {
        const cartId = this.generateCartId(); //debo crear este método!
        const newCart = {
            id: cartId,
            products: products.map(productId => ({ productId, quantity: 1 }))   
        };
        this.carts.push(newCart);
        console.log('Carrito creado exitosamente');
        this.archiveCarts();
        return newCart;
    }

    getProductsFromArray(){
        console.log("En el array tengo " + this.carts.length + " productos")
        return this.carts
    }

    getCarts(){
        //console.log("Nuevo array desde fs " + this.path)
        this.carts = JSON.parse(fs.readFileSync(this.path))
        return this.carts
    }

    saveCarts(){
        fs.writeFileSync(this.path, JSON.stringify(this.carts))
    }

    getCartByID(id){
        let carrito    
        this.carts.forEach(cart => {
            if(cart.id == id)
                carrito=cart
        })

        if (cart === undefined)
            return false;
        
        return producto 
    }
    

    deleteProductByID(id){
        if (!this.carts.some((product) => product.id == id )) {
            console.log ("No se encuentra el id: " + id +  ". No se ha eliminado nada.")
            return false
        }

        let nuevoArray = []
        

        this.carts.forEach(product => {
            if(product.id != id)
                nuevoArray.push(product)
            else
            console.log("Eliminando", product)

        })


        
        this.carts = []
        nuevoArray.forEach(product => {
        this.carts.push(product)
        console.log("me quedo con el con los productos", product)
        })

        this.saveProducts()

        return true  
    }
    

    updateProduct(id , p){

        let codigoExistente = false
        let actualizado = false
        this.carts.forEach(product => {
            if(product.id == id){
                console.log("inicio updateProduct", product);
                this.carts.forEach(x => {
                    if(x.id != id){
                        if(x.code == p.code)
                            codigoExistente = true
                    }
                })
            
                if (!codigoExistente){  
                    product.title = p.title 
                    product.description = p.description
                    product.price = p.price
                    product.thumbnail = p.thumbnail
                    product.code = p.code
                    product.stock = p.stock
                    actualizado = true
                }else{
                    console.log ("El id "+id+ " existe, pero el código " + p.code +" ya estaba en otro producto.")
                }
                }  
        })
        this.saveProducts()

        console.log(actualizado?"Producto actualizado":"Error al actualizar el producto")
        return actualizado
}
    

    addProduct(p){

        if (this.carts.some((product) => product.code == p.code )) {
            console.log ("Producto ignorado " + p.code) +  ", está repetido."
            return
        }

        let idDelNuevoProducto = 0
        this.carts.forEach(product => {
            if(product.id > idDelNuevoProducto)
                idDelNuevoProducto=product.id
        });
        idDelNuevoProducto++
        p.id = idDelNuevoProducto
        this.carts.push(p)
        this.saveProducts()
    }
}
