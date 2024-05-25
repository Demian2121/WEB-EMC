const productCatalog = document.getElementById('product-catalog');
const shoppingCart = document.getElementById('shopping-cart');
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function displayProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    productCatalog.innerHTML = '';

    products.forEach((product, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${product.name} - $${product.price}`;
        const addButton = document.createElement('button');
        addButton.textContent = 'Agregue al carrito';
        addButton.onclick = () => {
            addToCart(index);
        };
        listItem.appendChild(addButton);
        productCatalog.appendChild(listItem);
    });
}

function displayCart() {
    shoppingCart.innerHTML = '';
    cart.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} - $${item.price} x ${item.quantity}`;
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Quitar';
        removeButton.onclick = () => {
            removeFromCart(index);
        };
        listItem.appendChild(removeButton);
        shoppingCart.appendChild(listItem);
    });
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
    cart.splice(cartIndex, 1);
    displayCart();
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

function displayWelcomeMessage() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const welcomeMessage = document.getElementById('welcome-message');
    welcomeMessage.textContent = `Bienvenido, ${user.firstName} ${user.lastName}!`;
}

displayWelcomeMessage();
displayProducts();
displayCart();
