const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

const users = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'public'))); // Ajustar o caminho

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'loading.html'));
});

app.get('/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'cadastro.html'));
});

// ... outras rotas ...

app.post('/cadastro', (req, res) => {
    const { name, email, password, confirm_password } = req.body;

    if (password !== confirm_password) {
        return res.status(400).send('Senhas não conferem. <a href="/cadastro">Tente novamente</a>');
    }

    const userExists = users.some(user => user.email === email);

    if (userExists) {
        return res.status(400).send('Usuário já cadastrado. <a href="/login">Faça login</a>');
    }

    users.push({ name, email, password });
    res.redirect('/login');
});

// ... outras rotas ...

app.use((req, res) => {
    res.status(404).send('Página não encontrada');
});

module.exports = app; // Exporta o aplicativo
