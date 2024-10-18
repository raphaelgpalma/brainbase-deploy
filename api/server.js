const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose(); // Importa SQLite

const app = express();
const db = new sqlite3.Database('./database.db'); // Conecta ao banco

// Cria a tabela de usuários, se não existir
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT
  )
`);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'public')));

// Rotas de páginas HTML
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '..', 'public', 'loading.html')));
app.get('/cadastro', (req, res) => res.sendFile(path.join(__dirname, '..', 'public', 'cadastro.html')));
app.get('/projetos', (req, res) => res.sendFile(path.join(__dirname, '..', 'public', 'ProjetosHTML.html')));
app.get('/tarefas', (req, res) => res.sendFile(path.join(__dirname, '..', 'public', 'tarefas.html')));
app.get('/projetosEmGrupo', (req, res) => res.sendFile(path.join(__dirname, '..', 'public', 'projetosEmGrupo.html')));
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, '..', 'public', 'login.html')));
app.get('/menu-inicial', (req, res) => res.sendFile(path.join(__dirname, '..', 'public', 'menuInicial.html')));

// Rota de cadastro
app.post('/cadastro', (req, res) => {
    const { name, email, password, confirm_password } = req.body;

    if (password !== confirm_password) {
        return res.status(400).send('Senhas não conferem. <a href="/cadastro">Tente novamente</a>');
    }

    const query = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;

    db.run(query, [name, email, password], (err) => {
        if (err) {
            if (err.code === 'SQLITE_CONSTRAINT') {
                return res.status(400).send('Usuário já cadastrado. <a href="/login">Faça login</a>');
            }
            return res.status(500).send('Erro no servidor.');
        }
        res.redirect('/login');
    });
});

// Rota de login
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const query = `SELECT * FROM users WHERE email = ? AND password = ?`;

    db.get(query, [email, password], (err, user) => {
        if (err) {
            return res.status(500).send('Erro no servidor.');
        }
        if (!user) {
            return res.status(401).send('Credenciais inválidas. <a href="/login">Tente novamente</a>');
        }
        res.redirect('/menu-inicial');
    });
});

// Rota 404
app.use((req, res) => res.status(404).send('Página não encontrada'));

// Exporta o app para a Vercel
module.exports = app;
