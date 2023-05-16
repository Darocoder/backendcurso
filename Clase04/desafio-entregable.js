const fs = require("fs")

//clase que gestiona los productos
class ProductManager {
    constructor() {
        //array de productos vacio
        this.products = [];
        this.incrementor = 0;
        //propiedades de los productos
        this.productKeys = ["id", "title", "description", "price", "thumbnail", "code", "stock"];
        this.path = "./database.json"; //this.path solicitado por la consigna
    }
    //método para agregar productos al array products[]
    addProduct(newProduct) {
        //valindado que todos los campos sean obligatorios
        if (!this.validateProduct(newProduct))
        return console.warn("Faltan propiedades del producto");

        //valido que la propiedad code no se repita
        const isExistantCode = this.products.some(
        (product) => product.code == newProduct.code
        );
        if (isExistantCode) return console.info("Código existente");

        //genero un id auto incrementable
        const newProductWId = { id: this.incrementor, ...newProduct };
        this.incrementor++;
        this.products.push(newProductWId);

        //si el id ya se encuentra creado, guardo el nuevo producto aparte.
        const productToSave = this.products.find((product)=> this.incrementor == product.id);
        if(!productToSave) return console.log(this.products)
        //escribo el nuevo archivo de database y luego lo leo
        let dataProduct = JSON.stringify(this.products)
        fs.writeFile(this.path, dataProduct, (error)=>{
            if(error) return console.log(error);
            fs.readFile(this.path, "utf8", (error, resultado)=>{
                if(error) return console.log(error);
                let resultadoLeido = JSON.parse(resultado)
                console.log(resultadoLeido);
            });
        });
        }

        //devuelve el array creado hasta el momento
        getProducts() {
        // leer el archivo de productos
        const data = fs.readFileSync(this.path, "utf8");
        const products = JSON.parse(data);
        
        // actualizar el array de productos
        this.products = products;

        return this.products;
        }

        //devuelve el array que coincida con el id elegido
        getProductById(id) {
        const foundProduct = this.products.find((product) => id == product.id);
        if (!foundProduct) throw Error("Producto no encontrado");
        return foundProduct;
        }

        //para validar que todos los campos sean obligatorios, lo utilizo en addProduct
        validateProduct(product) {
        const productKeysToCheck = Object.keys(product);
        return productKeysToCheck.every((key) => this.productKeys.includes(key));
        }
}

const productManager = new ProductManager();

    productManager.addProduct({
    title: "manzana",
    code: "123",
    description: "roja",
    price: 12,
    stock: 199,
    thumbnail: "link"
});
productManager.addProduct({
    title: "pera",
    code: "124",
    description: "roja",
    price: 12,
    stock: 199,
    thumbnail: "link"
});

console.log("getProductById" + productManager.getProductById(1));

console.log("A continuación veremos todos los productos agregados")
console.log(productManager)
console.log(productManager.getProducts())
