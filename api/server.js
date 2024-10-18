const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'public')));

// Rotas para servir páginas HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'loading.html'));
});

app.get('/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'cadastro.html'));
});

app.get('/projetos', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'ProjetosHTML.html'));
});

app.get('/tarefas', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'tarefas.html'));
});

app.get('/projetosEmGrupo', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'projetosEmGrupo.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'login.html'));
});

app.get('/menu-inicial', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'menuInicial.html'));
});

// Cadastro de usuário com Prisma
app.post('/cadastro', async (req, res) => {
    const { name, email, password, confirm_password } = req.body;

    if (password !== confirm_password) {
        return res.status(400).send('Senhas não conferem. <a href="/cadastro">Tente novamente</a>');
    }

    try {
        await prisma.user.create({
            data: { name, email, password },
        });
        res.redirect('/login');
    } catch (error) {
        if (error.code === 'P2002') {  // Erro de email duplicado
            return res.status(400).send('Usuário já cadastrado. <a href="/login">Faça login</a>');
        }
        console.error(error);
        res.status(500).send('Erro no servidor. Tente novamente.');
    }
});

// Login de usuário com Prisma
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user || user.password !== password) {
            return res.status(401).send('Credenciais inválidas. <a href="/login">Tente novamente</a>');
        }

        res.redirect('/menu-inicial');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro no servidor. Tente novamente.');
    }
});

// Rota 404 para outras solicitações
app.use((req, res) => {
    res.status(404).send('Página não encontrada');
});

// Exporta o app para a Vercel
module.exports = app;
