const productCatalog = document.getElementById('product-catalog');
const carrito = document.getElementById('carrito');
const totalElement = document.getElementById('total');
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function displayProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    productCatalog.innerHTML = '';

    products.forEach((product, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${product.name} - $${product.price}`;
        const addButton = document.createElement('button');
        addButton.textContent = 'Agregar al carrito';
        addButton.onclick = () => {
            addToCart(index);
            $('#popupModalagregar').modal('show');
        };
        listItem.appendChild(addButton);
        productCatalog.appendChild(listItem);
    });
}

function displayCart() {
    carrito.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        listItem.textContent = `${item.name} - $${item.price} x ${item.quantity}`;
        const removeButton = document.createElement('button');
        removeButton.classList.add('btn', 'btn-danger', 'btn-sm', 'ml-2');
        removeButton.textContent = 'Quitar';
        removeButton.onclick = () => {
            removeFromCart(index);
        };
        listItem.appendChild(removeButton);
        carrito.appendChild(listItem);
    });
    totalElement.textContent = total.toFixed(2);
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(productIndex) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products[productIndex];
    const cartItem = cart.find(item => item.name === product.name);
    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    displayCart();
}

function removeFromCart(cartIndex) {
    cart[cartIndex].quantity -= 1;
    if (cart[cartIndex].quantity === 0) {
        cart.splice(cartIndex, 1);
    }
    displayCart();
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = '/index.html';
}

function displayWelcomeMessage() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const welcomeMessage = document.getElementById('welcome-message');
    welcomeMessage.textContent = `Bienvenido, ${user.firstName} ${user.lastName}!`;
}

displayWelcomeMessage();
displayProducts();
displayCart();
