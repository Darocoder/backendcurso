const socket = io()

let $productsList = document.getElementById("product-list")

socket.on('addProducts', (products) => {
    console.log(products)
    $productsList.innerHTML = "";
    products.forEach((product) => {
        const title = product.title;
        const pElement = document.createElement("p");
        pElement.textContent = title;
        $productsList.appendChild(pElement);
    });
});