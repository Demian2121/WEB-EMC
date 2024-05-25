document.getElementById('product-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('product-name').value;
    const price = document.getElementById('product-price').value;

    const products = JSON.parse(localStorage.getItem('products')) || [];
    products.push({ name, price });
    localStorage.setItem('products', JSON.stringify(products));
    displayProducts();
});

function displayProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const productListDelete = document.getElementById('product-list-delete');
    const productListView = document.getElementById('product-list-view');
    productListDelete.innerHTML = '';
    productListView.innerHTML = '';

    products.forEach((product, index) => {
        const listItemDelete = document.createElement('li');
        listItemDelete.textContent = `${product.name} - $${product.price}`;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Borrar Producto';
        deleteButton.onclick = () => {
            products.splice(index, 1);
            localStorage.setItem('products', JSON.stringify(products));
            displayProducts();
        };
        listItemDelete.appendChild(deleteButton);
        productListDelete.appendChild(listItemDelete);

        const listItemView = document.createElement('li');
        listItemView.textContent = `${product.name} - $${product.price}`;
        productListView.appendChild(listItemView);
    });
}

function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
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