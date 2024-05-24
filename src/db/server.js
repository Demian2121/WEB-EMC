const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const users = []; // Almacenará los usuarios en memoria.

const SECRET_KEY = 'your_secret_key';

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  res.status(201).send({ message: 'Usuario registrado satisfactoriamente' });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).send({ message: 'Credenciales Inválidas' });
  }
});

app.post('/logout', (req, res) => {
  res.send({ message: 'Logout successful' });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

