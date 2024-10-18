const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');  // Para manipular o JSON

const app = express();
const usersFilePath = path.join(__dirname, 'users.json');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'public')));

// Função para ler usuários do JSON
function loadUsers() {
    if (fs.existsSync(usersFilePath)) {
        const data = fs.readFileSync(usersFilePath, 'utf8');
        return JSON.parse(data);
    }
    return [];
}

// Função para salvar usuários no JSON
function saveUsers(users) {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
}

// Rota de cadastro
app.post('/cadastro', (req, res) => {
    const { name, email, password, confirm_password } = req.body;

    if (password !== confirm_password) {
        return res.status(400).send('Senhas não conferem. <a href="/cadastro">Tente novamente</a>');
    }

    let users = loadUsers();
    const userExists = users.some(user => user.email === email);

    if (userExists) {
        return res.status(400).send('Usuário já cadastrado. <a href="/login">Faça login</a>');
    }

    users.push({ name, email, password });
    saveUsers(users);
    res.redirect('/login');
});

// Rota de login
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const users = loadUsers();
    const user = users.find(user => user.email === email && user.password === password);

    if (!user) {
        return res.status(401).send('Credenciais inválidas. <a href="/login">Tente novamente</a>');
    }

    res.redirect('/menu-inicial'); 
});

// Roteia outras requisições para 404
app.use((req, res) => {
    res.status(404).send('Página não encontrada');
});

module.exports = app;
