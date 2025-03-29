const express = require('express');
const axios = require('axios');
const app = express();
const port = 8080;

app.use(express.static('public'));

app.get('/api/users', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:3000/users'); // Substitua pela sua API
        console.log('Resposta da API:', response.data);
        res.json(response.data);
    } catch (error) {
        console.error('Erro ao buscar usuários da API:', error);
        res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});