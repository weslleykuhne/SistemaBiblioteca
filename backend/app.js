const expresses = require('express');
const cors = require('cors');
const connection = require('./db');

const server = expresses();
server.use(cors());
server.use(expresses.json());

//Rota de busca Livros
server.get('/livros', (req, res) => {
    const sql = 'SELECT * FROM Livro';
    connection.query(sql, (erro, resultados) => {
        if (erro) {
            res.status(500).json({ error: erro.message });
        }
        return res.json(resultados);
    });
})
server.get('/livros/:id', (req, res) => {
    const sql = 'SELECT * FROM Livro WHERE id = ?';
    connection.query(sql, [req.params.id], (erro, resultados) => {
        if (erro) {
            res.status(500).json({ error: erro.message });
        }
        return res.json(resultados);
    });
});
server.get('/livros/ordenados', (req, res) => {
    const sql = 'SELECT * FROM Livro ORDER BY titulo ASC';
    connection.query(sql, (erro, resultados) => {
        if (erro) {
            res.status(500).json({ error: erro.message });
        }
        return res.json(resultados);
    });
});
server.post('/livros', (req, res) => {
    const{ titulo, autor, ano_publicacao, categoria } = req.body;
    if (
        titulo == NULL || autor == NULL || ano_publicacao == NULL || categoria == NULL
    ) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }
    const sql = 'INSERT INTO Livro (titulo, autor, ano_publicacao, categoria) VALUES (?, ?, ?, ?)';
    connection.query(sql, [titulo, autor, ano_publicacao, categoria], (erro, resultados) => {
        if (erro) {
            res.status(500).json({ error: erro.message });
        }
        return res.status(201).json({ message: 'Livro adicionado com sucesso!', id: resultados.insertId });
    });
});
server.put('/livros/:id', (req, res) => {
    const { titulo, autor, ano_publicacao, categoria } = req.body;
    const { id } = req.params;
    const sql = 'UPDATE Livro SET titulo = ?, autor = ?, ano_publicacao = ?, categoria = ? WHERE id = ?';
    connection.query(sql, [titulo, autor, ano_publicacao, categoria, id], (erro, resultados) => {
        if (erro) {
            res.status(500).json({ error: erro.message });
        }
        return res.json({ message: 'Livro atualizado com sucesso!' });
    });
});

server.delete('/livros/:id', (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM Livro WHERE id = ?';

    connection.query(sql, [id], (erro, resultados) => {
        if (erro) {
            res.status(500).json({ error: erro.message });
        }
        return res.json({ message: 'Livro removido com sucesso!' });
    });
});

//Rota de busca Usuarios
server.get('/usuarios', (req, res) => {
    const sql = 'SELECT * FROM Usuario';
    connection.query(sql, (erro, resultados) => {
        if (erro){
            res.status(500).json({ error: erro.message});}
        return res.json(resultados);
});
});








server.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});