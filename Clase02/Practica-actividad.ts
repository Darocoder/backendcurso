type Product = {
    id: number;
    title: string;
    description: string;
    price: number;
    thumbnail: string;
    code: string;
    stock: number;
}

type ProductWhithoutId = Omit<Product, "id">

class ProductManager {
    private products: Product[];
    private incrementor: number;
    private readonly productKeys: string[]

    constructor() {
        this.products = [] 
        this.incrementor = 0
        this.productKeys = ["id", "title", "description", "price", "thumbnail", "code", "stock"] 
        
    } 

    addProduct(newProduct: ProductWhithoutId):void {
        if (!this.validateProduct(newProduct)) return console.warn("Faltan propiedades del producto")
        const isExistantCode = this.products.some((product) => product.code == newProduct.code )
        if (isExistantCode) return console.info("Código existente")
        const newProductWId: Product = {id: this.incrementor, ...newProduct}
        this.incrementor++
        this.products.push(newProductWId)
    }

    getProducts():Product[] {
        return this.products
    }
    getProductById(id: number): Product {
        const foundProduct = this.products.find((product) => id == product.id)
        if (!foundProduct) throw Error("Producto no encontrado")
        return foundProduct
    }

    validateProduct(product: ProductWhithoutId): boolean {
        const productKeysToCheck = Object.keys(product)
        return productKeysToCheck.every((key) => this.productKeys.includes(key))
    }
}

const productManager = new ProductManager()

productManager.addProduct({
    title: "manzana",
    code: "123",
    description: "roja",
    price: 12,
    stock: 199,
    thumbnail:"link",
})
productManager.addProduct({
    title: "pera",
    code: "123",
    description: "roja",
    price: 12,
    stock: 199,
    thumbnail:"link",
})

console.log(productManager.getProductById(2))   