const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const users = [];

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'loading.html'));
});

app.get('/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'cadastro.html'));
});

app.get('/projetos', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'ProjetosHTML.html'));
});

app.get('/tarefas', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'tarefas.html'));
});

app.get('/projetosEmGrupo', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'projetosEmGrupo.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/menu-inicial', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'menuInicial.html'));
});

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


app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const user = users.find(user => user.email === email && user.password === password);

    if (!user) {
        return res.status(401).send('Credenciais inválidas. <a href="/login">Tente novamente</a>');
    }

    res.redirect('/menu-inicial'); 
});

// Roteia todas as outras solicitações para um 404
app.use((req, res) => {
    res.status(404).send('Página não encontrada');
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
