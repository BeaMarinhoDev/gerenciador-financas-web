import express from 'express';
import dotenv from 'dotenv';

//import { errorHandler } from './middlewares/errorHandler.js'; // Middleware de erros
//import { notFoundHandler } from './middlewares/notFoundHandler.js'; // Middleware de página não encontrada

// Importação das rotas
import indexRoutes from './routes/index.js';
import homeRoutes from './routes/home.js';
import usersRoutes from './routes/users.js';
import registerRoutes from './routes/register.js';


// Carrega as variáveis de ambiente
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

// Middleware para servir arquivos estáticos
app.use(express.static('public'));

// Uso das rotas
app.use('/', indexRoutes);
app.use('/home', homeRoutes);
app.use('/users', usersRoutes);
app.use('/register', registerRoutes);

// Middleware global para tratamento de erros
//app.use(errorHandler);

// Inicialização do servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});