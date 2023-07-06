const socket = io();

socket.on("arrayProducts", (array) => {
    let products = "";
    array.forEach(product => {
        products += `
            Producto: ${product.title}
            <br>Descripción: ${product.description}
            <br>Precio: ${product.price}
            <br>Stock: ${product.stock}
            <br>`;
    });
    document.getElementById("products").innerHTML = products;
})

const form = document.getElementById("form");
const inputTitle = document.getElementById("title");
const inputDescription = document.getElementById("description");
const inputPrice = document.getElementById("price");
const inputThumbnail = document.getElementById("thumbnail");
const inputCode = document.getElementById("code");
const inputStock = document.getElementById("stock");
const inputStatus = document.getElementById("status");
const btn = document.getElementById("send");
const products = document.getElementById("products");

form.onsubmit = (send) => {
    send.preventDefault();
    const newProduct = {
        title: inputTitle.value,
        description: inputDescription.value,
        price: inputPrice.value,
        code: inputCode.value,
        stock: inputStock.value,
        status: inputStatus.value
    }
    socket.emit("newProduct", newProduct)
}

