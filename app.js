const productName = document.querySelector("#productName");
const productPrice = document.querySelector("#productPrice");
const productSave = document.querySelector("#button-save");
const buttonClear = document.querySelector("#button-clear");
const buttonClose = document.querySelector("#button-close");
const productList = document.querySelector("#product-list");
const totalOutput = document.querySelector("#total");

let total = 0;
let productCount = 0;
let isBoxClosed = false;

const createNewProduct = (name, price) => {
    const ionCard = document.createElement("ion-card");
    const newProductItem = document.createElement("ion-card-content");
    newProductItem.textContent = `${name}: $${price}`;
    ionCard.appendChild(newProductItem);

    if (isBoxClosed) {
        productList.insertBefore(ionCard, productList.childNodes[0]);
    } else {
        productList.appendChild(ionCard);
    }
}

const createTotalItem = (totalAmount) => {
    const ionCard = document.createElement("ion-card");
    const newProductItem = document.createElement("ion-card-content");
    newProductItem.textContent = `Total Caja Cerrada: $${totalAmount}`;
    ionCard.appendChild(newProductItem);

    const deleteButton = document.createElement("ion-button");
    deleteButton.textContent = "Eliminar Caja";
    deleteButton.color = "danger";
    deleteButton.slot = "end";
    deleteButton.addEventListener("click", () => {
        ionCard.remove();
    });
    ionCard.appendChild(deleteButton);

    productList.appendChild(ionCard);
}

const presentAlert = () => {
    const alert = document.createElement("ion-alert");
    alert.header = "Dato inválido";
    alert.subHeader = "Verifica la información";
    alert.message = "El nombre o el precio son incorrectos";
    alert.buttons = ["Aceptar"];

    document.body.appendChild(alert);
    return alert.present();
}

const isEmpty = str => !str.trim().length;

productSave.addEventListener('click', () => {
    if (isBoxClosed) {
        console.log("La caja ya está cerrada. No se pueden agregar más productos.");
        return;
    }

    const name = productName.value;
    const price = productPrice.value;

    if (isEmpty(name) || price <= 0 || isEmpty(price)) {
        presentAlert();
        return;
    } 

    createNewProduct(name, price); 
    total += +price;
    totalOutput.textContent = total;
    productCount++;
});

buttonClear.addEventListener('click', () => {
    if (isBoxClosed) {
        console.log("La caja ya está cerrada. No se pueden limpiar los productos.");
        return;
    }

    // Limpiar los campos de entrada
    productName.value = '';
    productPrice.value = '';
});

buttonClose.addEventListener('click', () => {
    if (productCount < 2) {
        console.log("No hay suficientes productos para cerrar la caja.");
        return;
    }

    isBoxClosed = true;
    createTotalItem(total);
    total = 0;
    totalOutput.textContent = total;
    productCount = 0;
});
