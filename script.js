const users = JSON.parse(localStorage.getItem('users')) || [];

document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        if (user.userType === 'client') {
            window.location.href = 'client.html';
        } else if (user.userType === 'admin') {
            window.location.href = 'admin.html';
        }
    } else {
        const warningMessage = document.getElementById('warning-message');
        warningMessage.textContent = 'Usuario no encontrado o contraseña erronéa.';
        warningMessage.style.display = 'block';
    }
});

document.getElementById('register-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const username = document.getElementById('new-username').value;
    const password = document.getElementById('new-password').value;
    const userType = document.getElementById('user-type').value;

    const user = { firstName, lastName, username, password, userType };
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    alert('User registered successfully!');
    toggleForm();
});

function toggleForm() {
    const loginContainer = document.getElementById('form-container');
    const registerContainer = document.getElementById('register-container');
    if (loginContainer.style.display === 'none') {
        loginContainer.style.display = 'block';
        registerContainer.style.display = 'none';
    } else {
        loginContainer.style.display = 'none';
        registerContainer.style.display = 'block';
    }
}