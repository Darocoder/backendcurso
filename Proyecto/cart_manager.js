import fs from "fs";

export class CartProduct {
    constructor({title, description, price, thumbnail, code, stock}){
        this.id = undefined
        this.title = title 
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock
    }
}

export class CartManager {

    constructor(){
        this.products= [],
        this.path = "carts.json"
    }

    getProductsFromArray(){
        console.log("En el array tengo " + this.products.length + " productos")
        return this.products
    }

    getProducts(){
        //console.log("Nuevo array desde fs " + this.path)
        this.products = JSON.parse(fs.readFileSync(this.path))
        return this.products
    }

    saveProducts(){
        fs.writeFileSync(this.path, JSON.stringify(this.products))
    }

    getProductByID(id){
        let producto    
        this.products.forEach(product => {
            if(product.id == id)
            producto=product
        })

        if (producto === undefined){
            console.log("No econtrado", id)
        }else{
            console.log ("Producto encontrado " + id, producto)
        }
        return producto 
    }
    

    deleteProductByID(id){
        if (!this.products.some((product) => product.id == id )) {
            console.log ("No se encuentra el id: " + id +  ". No se ha eliminado nada.")
            return false
        }

        let nuevoArray = []
        

        this.products.forEach(product => {
            if(product.id != id)
                nuevoArray.push(product)
            else
            console.log("Eliminando", product)

        })


        
        this.products = []
        nuevoArray.forEach(product => {
        this.products.push(product)
        console.log("me quedo con el con los productos", product)
        })

        this.saveProducts()

        return true  
    }
    

    updateProduct(id , p){

        let codigoExistente = false
        let actualizado = false
        this.products.forEach(product => {
            if(product.id == id){
                console.log("inicio updateProduct", product);
                this.products.forEach(x => {
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

        if (this.products.some((product) => product.code == p.code )) {
            console.log ("Producto ignorado " + p.code) +  ", está repetido."
            return
        }

        let idDelNuevoProducto = 0
        this.products.forEach(product => {
            if(product.id > idDelNuevoProducto)
                idDelNuevoProducto=product.id
        });
        idDelNuevoProducto++
        p.id = idDelNuevoProducto
        this.products.push(p)
        this.saveProducts()
    }
}
