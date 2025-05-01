import express from 'express';
import dotenv from 'dotenv';

import { errorHandler } from './middlewares/errorHandler.js'; // Middleware de erros
//import { notFoundHandler } from './middlewares/notFoundHandler.js'; // Middleware de página não encontrada

// Importação das rotas
import indexRoutes from './index.js';

// Carrega as variáveis de ambiente
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

// Middleware para servir arquivos estáticos
app.use(express.static('public'));

// Uso das rotas
app.use('/', indexRoutes);

// Middleware global para tratamento de erros
app.use(errorHandler);

app.use((req, res, next) => {
    res.locals.backendUrl = process.env.BACKEND_URL || 'http://localhost:3000';
    next();
});

// Middleware para injetar a variável no HTML
app.get('/config.js', (req, res) => {
    res.type('application/javascript');
    res.send(`const backendUrl = "${process.env.BACKEND_URL || 'http://localhost:3000'}";`);
});

// Inicialização do servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});