const socketClient = io()

const form = document.getElementById("form");
const inputTitle = document.getElementById("title");
const inputDescription = document.getElementById("description");
const inputPrice = document.getElementById("price");
const inputThumbnail = document.getElementById("thumbnail");
const inputCode = document.getElementById("code");
const inputStock = document.getElementById("stock");
const inputStatus = document.getElementById("status");
const btn = document.addEventListener("send")
const output = document.addEventListener("output")

form.onsubmit = (e) => {
    e.preventDefault();
    const title = inputTitle.value;
    const description = inputDescription.value;
    const price = inputPrice.value;
    const thumbnail = inputThumbnail.value;
    const code = inputCode.value;
    const stock = inputStock.value;
    const status = inputStatus.value;
    socketClient.emit("newProduct", {title,description,price,thumbnail,code,stock,status})
}

socketClient.on ("realTimeProducts", (data) => {
    const realTimeProducts = data.map((prod) => {
        return `<li>Title: ${prod.title}<br>Description: ${prod.description}Price: ${prod.price}</li><br>`
    })
    output.innerHTML = realTimeProducts
})
